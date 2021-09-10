import { Test } from '@nestjs/testing';

import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceService } from './allowance-compliance.service';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { State } from '../enum/state.enum';
import { AllowanceProgram } from '../enum/allowance-programs.enum';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { OwnerYearDim } from '../entities/owner-year-dim.entity';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

const mockAccountComplianceDimRepository = () => ({
  getAllowanceCompliance: jest.fn(),
});

const mockAllowanceComplianceMap = () => ({
  many: jest.fn(),
});

const mockOwnerYearDimRepository = () => ({
  getAllOwnerOperators: jest.fn(),
});

const mockRequest = () => {
  return {
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Allowance Compliance Service --', () => {
  let allowanceComplianceService;
  let accountComplianceDimRepository;
  let ownerYearDimRepository;
  let allowanceComplianceMap;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AllowanceComplianceService,
        {
          provide: AccountComplianceDimRepository,
          useFactory: mockAccountComplianceDimRepository,
        },
        {
          provide: AllowanceComplianceMap,
          useFactory: mockAllowanceComplianceMap,
        },
        {
          provide: OwnerYearDimRepository,
          useFactory: mockOwnerYearDimRepository,
        },
        OwnerOperatorsMap,
      ],
    }).compile();

    allowanceComplianceService = module.get(AllowanceComplianceService);
    accountComplianceDimRepository = module.get(AccountComplianceDimRepository);
    ownerYearDimRepository = module.get(OwnerYearDimRepository);
    allowanceComplianceMap = module.get(AllowanceComplianceMap);
    req = mockRequest();
    req.res.setHeader.mockReturnValue();
  });

  describe('getAllowanceCompliance', () => {
    it('calls AccountComplianceDimRepository.getAllowanceCompliance() and gets all allowance based compliance data from the repository', async () => {
      accountComplianceDimRepository.getAllowanceCompliance.mockResolvedValue(
        'list of allowance based compliance data',
      );
      allowanceComplianceMap.many.mockReturnValue('mapped DTOs');

      let filters: AllowanceComplianceParamsDTO = {
        year: [2019, 2020],
        page: undefined,
        perPage: undefined,
        orisCode: [0],
        ownerOperator: [''],
        state: [State.AK],
        program: [AllowanceProgram.ARP],
      };

      let result = await allowanceComplianceService.getAllowanceCompliance(
        filters,
        req,
      );

      let filtersOtc: AllowanceComplianceParamsDTO = {
        year: [2019, 2020],
        page: undefined,
        perPage: undefined,
        orisCode: [0],
        ownerOperator: [''],
        state: [State.AK],
        program: [AllowanceProgram.OTC],
      };

      result = await allowanceComplianceService.getAllowanceCompliance(
        filtersOtc,
        req,
      );

      expect(allowanceComplianceMap.many).toHaveBeenCalled();
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
