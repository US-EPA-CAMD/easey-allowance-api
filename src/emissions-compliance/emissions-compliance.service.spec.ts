import { Test } from '@nestjs/testing';
import { State } from '@us-epa-camd/easey-common/enums';

import { EmissionsComplianceService } from './emissions-compliance.service';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';

const mockUnitComplianceDimRepository = () => ({
  getEmissionsCompliance: jest.fn(),
});

const mockEmissionsComplianceMap = () => ({
  many: jest.fn(),
});

const mockRequest = () => {
  return {
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Emissions Compliance Service --', () => {
  let emissionsComplianceService;
  let unitComplianceDimRepository;
  let emissionsComplianceMap;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmissionsComplianceService,
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

  describe('getEmissionsCompliance', () => {
    it('calls EmissionsComplianceDimRepository.getEmissionsCompliance() and gets all emissions based compliance data from the repository', async () => {
      unitComplianceDimRepository.getEmissionsCompliance.mockResolvedValue(
        'list of emissions based compliance data',
      );
      emissionsComplianceMap.many.mockReturnValue('mapped DTOs');

      let filters: EmissionsComplianceParamsDTO = {
        year: [2019, 2020],
        page: undefined,
        perPage: undefined,
        facilityId: [0],
        ownerOperator: [''],
        state: [State.AK],
      };

      let result = await emissionsComplianceService.getEmissionsCompliance(
        filters,
        req,
      );

      let filtersOtc: EmissionsComplianceParamsDTO = {
        year: [2019, 2020],
        page: undefined,
        perPage: undefined,
        facilityId: [0],
        ownerOperator: [''],
        state: [State.AK],
      };

      result = await emissionsComplianceService.getEmissionsCompliance(
        filtersOtc,
        req,
      );

      expect(emissionsComplianceMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });
});
