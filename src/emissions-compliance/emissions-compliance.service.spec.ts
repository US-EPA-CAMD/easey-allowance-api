import { Test } from '@nestjs/testing';
import { State } from '@us-epa-camd/easey-common/enums';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { EmissionsComplianceService } from './emissions-compliance.service';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import {
  PaginatedEmissionsComplianceParamsDTO,
  StreamEmissionsComplianceParamsDTO,
} from '../dto/emissions-compliance.params.dto';
import { StreamService } from '@us-epa-camd/easey-common/stream';
import { StreamableFile } from '@nestjs/common';

const mockUnitComplianceDimRepository = () => ({
  getEmissionsCompliance: jest.fn(),
  streamEmissionsCompliance: jest.fn(),
  getAllApplicableEmissionsComplianceAttributes: jest.fn(),
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

const mockEmissionsComplianceMap = () => ({
  many: jest.fn(),
});

let req: any;

describe('-- Emissions Compliance Service --', () => {
  let emissionsComplianceService;
  let unitComplianceDimRepository;
  let emissionsComplianceMap;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        EmissionsComplianceService,
        {
          provide: StreamService,
          useFactory: () => ({
            getStream: () => {
              return mockStream;
            },
          }),
        },
        {
          provide: UnitComplianceDimRepository,
          useFactory: mockUnitComplianceDimRepository,
        },
        {
          provide: EmissionsComplianceMap,
          useFactory: mockEmissionsComplianceMap,
        },
      ],
    }).compile();

    emissionsComplianceService = module.get(EmissionsComplianceService);
    unitComplianceDimRepository = module.get(UnitComplianceDimRepository);
    emissionsComplianceMap = module.get(EmissionsComplianceMap);
    req = mockRequest();
    req.res.setHeader.mockReturnValue();
  });

  describe('streamEmissionsCompliance', () => {
    it('streams all emissions compliance data', async () => {
      unitComplianceDimRepository.getStreamQuery.mockResolvedValue('');

      let filters = new StreamEmissionsComplianceParamsDTO();

      req.headers.accept = '';

      let result = await emissionsComplianceService.streamEmissionsCompliance(
        req,
        filters,
      );

      expect(result).toEqual(
        new StreamableFile(Buffer.from('stream'), {
          type: req.headers.accept,
          disposition: `attachment; filename="emissions-compliance-${0}.json"`,
        }),
      );
    });
  });

  describe('getEmissionsCompliance', () => {
    it('calls EmissionsComplianceDimRepository.getEmissionsCompliance() and gets all emissions based compliance data from the repository', async () => {
      unitComplianceDimRepository.getEmissionsCompliance.mockResolvedValue(
        'list of emissions based compliance data',
      );
      emissionsComplianceMap.many.mockReturnValue('mapped DTOs');

      let filters = new PaginatedEmissionsComplianceParamsDTO();
      filters.year = [2019];
      filters.page = undefined;
      filters.perPage = undefined;
      filters.facilityId = [0];
      filters.stateCode = [State.AK];
      filters.ownerOperator = [''];

      let result = await emissionsComplianceService.getEmissionsCompliance(
        filters,
        req,
      );

      let filtersOtc = new PaginatedEmissionsComplianceParamsDTO();
      filtersOtc.year = [2019];
      filtersOtc.page = undefined;
      filtersOtc.perPage = undefined;
      filtersOtc.facilityId = [0];
      filtersOtc.stateCode = [State.AK];
      filtersOtc.ownerOperator = [''];

      result = await emissionsComplianceService.getEmissionsCompliance(
        filtersOtc,
        req,
      );

      expect(emissionsComplianceMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });
});
