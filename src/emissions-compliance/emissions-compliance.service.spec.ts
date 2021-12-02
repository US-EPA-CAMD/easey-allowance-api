import { Test } from '@nestjs/testing';
import { State } from '@us-epa-camd/easey-common/enums';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { EmissionsComplianceService } from './emissions-compliance.service';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { ApplicableEmissionsComplianceAttributesMap } from '../maps/applicable-emissions-compliance-map';

const mockUnitComplianceDimRepository = () => ({
  getEmissionsCompliance: jest.fn(),
  getAllApplicableEmissionsComplianceAttributes: jest.fn(),
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
  let applicableEmissionsComplianceAttributesMap;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
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
        {
          provide: ApplicableEmissionsComplianceAttributesMap,
          useFactory: mockEmissionsComplianceMap,
        },
      ],
    }).compile();

    emissionsComplianceService = module.get(EmissionsComplianceService);
    unitComplianceDimRepository = module.get(UnitComplianceDimRepository);
    emissionsComplianceMap = module.get(EmissionsComplianceMap);
    applicableEmissionsComplianceAttributesMap = module.get(
      ApplicableEmissionsComplianceAttributesMap,
    );
    req = mockRequest();
    req.res.setHeader.mockReturnValue();
  });

  describe('getEmissionsCompliance', () => {
    it('calls EmissionsComplianceDimRepository.getEmissionsCompliance() and gets all emissions based compliance data from the repository', async () => {
      unitComplianceDimRepository.getEmissionsCompliance.mockResolvedValue(
        'list of emissions based compliance data',
      );
      emissionsComplianceMap.many.mockReturnValue('mapped DTOs');

      let filters: EmissionsComplianceParamsDTO = new EmissionsComplianceParamsDTO();
      filters.year = [2019];
      filters.page = undefined;
      filters.perPage = undefined;
      filters.facilityId = [0];
      filters.state = [State.AK];
      filters.ownerOperator = [''];

      let result = await emissionsComplianceService.getEmissionsCompliance(
        filters,
        req,
      );

      let filtersOtc: EmissionsComplianceParamsDTO = new EmissionsComplianceParamsDTO();
      filtersOtc.year = [2019];
      filtersOtc.page = undefined;
      filtersOtc.perPage = undefined;
      filtersOtc.facilityId = [0];
      filtersOtc.state = [State.AK];
      filtersOtc.ownerOperator = [''];

      result = await emissionsComplianceService.getEmissionsCompliance(
        filtersOtc,
        req,
      );

      expect(emissionsComplianceMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });

  describe('getAllApplicableEmissionsComplianceAttributes', () => {
    it('call unitComplianceDimRepository.getAllApplicableEmissionsComplianceAttributes() and gets all applicable emissions compliance attributes', async () => {
      unitComplianceDimRepository.getAllApplicableEmissionsComplianceAttributes.mockResolvedValue(
        'list of applicable emissions compliance attributes',
      );

      applicableEmissionsComplianceAttributesMap.many.mockReturnValue(
        'mapped DTOs',
      );

      const result = await emissionsComplianceService.getAllApplicableEmissionsComplianceAttributes();
      expect(
        applicableEmissionsComplianceAttributesMap.many,
      ).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });
});
