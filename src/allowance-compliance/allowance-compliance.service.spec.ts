import { Test } from '@nestjs/testing';
import { State, AllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceService } from './allowance-compliance.service';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import {
  PaginatedAllowanceComplianceParamsDTO,
  StreamAllowanceComplianceParamsDTO,
} from '../dto/allowance-compliance.params.dto';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { OwnerYearDim } from '../entities/owner-year-dim.entity';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { StreamService } from '@us-epa-camd/easey-common/stream';
import { StreamableFile } from '@nestjs/common';

const mockAccountComplianceDimRepository = () => ({
  getAllowanceCompliance: jest.fn(),
  getAllApplicableAllowanceComplianceAttributes: jest.fn(),
  getStreamQuery: jest.fn(),
});

const mockStream = {
  pipe: jest.fn().mockReturnValue({
    pipe: jest.fn().mockReturnValue(Buffer.from('stream')),
  }),
};

jest.mock('uuid', () => {
  return { v4: jest.fn().mockReturnValue(0) };
});

const mockAllowanceComplianceMap = () => ({
  many: jest.fn(),
});

const mockOwnerYearDimRepository = () => ({
  getAllOwnerOperators: jest.fn(),
});

const mockRequest = (url?: string, page?: number, perPage?: number) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
    query: {
      page,
      perPage,
    },
    headers: {
      accept: 'text/csv',
    },
    on: jest.fn(),
  };
};

let req: any;

describe('-- Allowance Compliance Service --', () => {
  let allowanceComplianceService;
  let accountComplianceDimRepository;
  let ownerYearDimRepository;
  let allowanceComplianceMap;
  let applicableAllowanceComplianceAttributesMap;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AllowanceComplianceService,
        {
          provide: AccountComplianceDimRepository,
          useFactory: mockAccountComplianceDimRepository,
        },
        {
          provide: StreamService,
          useFactory: () => ({
            getStream: () => {
              return mockStream;
            },
          }),
        },
        {
          provide: AllowanceComplianceMap,
          useFactory: mockAllowanceComplianceMap,
        },
        {
          provide: OwnerYearDimRepository,
          useFactory: mockOwnerYearDimRepository,
        },
        {
          provide: ApplicableAllowanceComplianceAttributesMap,
          useFactory: mockAllowanceComplianceMap,
        },
        OwnerOperatorsMap,
      ],
    }).compile();

    allowanceComplianceService = module.get(AllowanceComplianceService);
    accountComplianceDimRepository = module.get(AccountComplianceDimRepository);
    ownerYearDimRepository = module.get(OwnerYearDimRepository);
    allowanceComplianceMap = module.get(AllowanceComplianceMap);
    applicableAllowanceComplianceAttributesMap = module.get(
      ApplicableAllowanceComplianceAttributesMap,
    );
    req = mockRequest();
    req.res.setHeader.mockReturnValue();
  });

  describe('streamAllowanceCompliance', () => {
    it('streams allowance compliance', async () => {
      accountComplianceDimRepository.getStreamQuery.mockResolvedValue('');

      let filters = new StreamAllowanceComplianceParamsDTO();

      req.headers.accept = '';
      req.on = jest.fn().mockResolvedValue('');

      let result = await allowanceComplianceService.streamAllowanceCompliance(
        req,
        filters,
      );

      expect(result).toEqual(
        new StreamableFile(Buffer.from('stream'), {
          type: req.headers.accept,
          disposition: `attachment; filename="allowance-compliance-${0}.json"`,
        }),
      );
    });
  });

  describe('getAllowanceCompliance', () => {
    it('calls AccountComplianceDimRepository.getAllowanceCompliance() and gets all allowance based compliance data from the repository', async () => {
      accountComplianceDimRepository.getAllowanceCompliance.mockResolvedValue(
        'list of allowance based compliance data',
      );
      allowanceComplianceMap.many.mockReturnValue('mapped DTOs');

      let filters: PaginatedAllowanceComplianceParamsDTO = new PaginatedAllowanceComplianceParamsDTO();
      filters.year = [2019];
      filters.page = undefined;
      filters.perPage = undefined;
      filters.facilityId = [0];
      filters.ownerOperator = [''];
      filters.stateCode = [State.AK];
      filters.programCodeInfo = [AllowanceProgram.OTC];

      let result = await allowanceComplianceService.getAllowanceCompliance(
        filters,
        req,
      );

      let filtersOtc: PaginatedAllowanceComplianceParamsDTO = new PaginatedAllowanceComplianceParamsDTO();
      filtersOtc.year = [2019];
      filtersOtc.page = undefined;
      filtersOtc.perPage = undefined;
      filtersOtc.facilityId = [0];
      filtersOtc.ownerOperator = [''];
      filtersOtc.stateCode = [State.AK];
      filtersOtc.programCodeInfo = [AllowanceProgram.OTC];

      result = await allowanceComplianceService.getAllowanceCompliance(
        filtersOtc,
        req,
      );

      expect(allowanceComplianceMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });

  describe('getAllApplicableAllowanceComplianceAttributes', () => {
    it('call AccountComplianceDimRepository.getAllApplicableAllowanceComplianceAttributes() and gets all applicable allowance compliance attributes', async () => {
      accountComplianceDimRepository.getAllApplicableAllowanceComplianceAttributes.mockResolvedValue(
        'list of applicable allowance compliance attributes',
      );

      applicableAllowanceComplianceAttributesMap.many.mockReturnValue(
        'mapped DTOs',
      );

      const result = await allowanceComplianceService.getAllApplicableAllowanceComplianceAttributes();
      expect(
        applicableAllowanceComplianceAttributesMap.many,
      ).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });

  describe('getAllOwnerOperators', () => {
    it('repository.getAllOwnerOperators() and returns all valid owner/operators', async () => {
      let ownerDimEntity: OwnerYearDim = new OwnerYearDim();
      ownerDimEntity.ownId = 0;
      ownerDimEntity.ownerOperator = '';
      ownerDimEntity.ownType = '';

      const ownerOperatorsDTO: OwnerOperatorsDTO = {
        ownerOperator: '',
        ownType: '',
      };

      ownerYearDimRepository.getAllOwnerOperators.mockResolvedValue([
        ownerDimEntity,
      ]);

      let result = await allowanceComplianceService.getAllOwnerOperators();

      expect(ownerYearDimRepository.getAllOwnerOperators).toHaveBeenCalled();
      expect(result).toEqual([ownerOperatorsDTO]);
    });
  });
});
