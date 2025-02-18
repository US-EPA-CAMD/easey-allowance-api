import { Test } from '@nestjs/testing';
import { State } from '@us-epa-camd/easey-common/enums';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { EntityManager } from 'typeorm';

import { AccountComplianceDimRepository } from '../allowance-compliance/account-compliance-dim.repository';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { OwnerYearDimRepository } from '../allowance-compliance/owner-year-dim.repository';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { PaginatedEmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { EmissionsComplianceController } from './emissions-compliance.controller';
import { EmissionsComplianceService } from './emissions-compliance.service';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Emissions Compliance Controller --', () => {
  let emissionsComplianceController: EmissionsComplianceController;
  let allowanceComplianceService: AllowanceComplianceService;
  let emissionsComplianceService: EmissionsComplianceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [EmissionsComplianceController],
      providers: [
        AllowanceComplianceService,
        EmissionsComplianceService,
        EntityManager,
        AllowanceComplianceMap,
        EmissionsComplianceMap,
        AccountComplianceDimRepository,
        UnitComplianceDimRepository,
        OwnerYearDimRepository,
        OwnerOperatorsMap,
        ApplicableAllowanceComplianceAttributesMap,
      ],
    }).compile();

    emissionsComplianceController = module.get(EmissionsComplianceController);
    allowanceComplianceService = module.get(AllowanceComplianceService);
    emissionsComplianceService = module.get(EmissionsComplianceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getEmissionsCompliance', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return emissions compliance data ', async () => {
      const expectedResults: EmissionsComplianceDTO[] = [];
      const paramsDTO = new PaginatedEmissionsComplianceParamsDTO();
      paramsDTO.year = [2019];
      paramsDTO.page = undefined;
      paramsDTO.perPage = undefined;
      paramsDTO.facilityId = [0];
      paramsDTO.stateCode = [State.AK];
      paramsDTO.ownerOperator = [''];

      jest
        .spyOn(emissionsComplianceService, 'getEmissionsCompliance')
        .mockResolvedValue(expectedResults);
      expect(
        await emissionsComplianceController.getEmissionsCompliance(
          paramsDTO,
          req,
        ),
      ).toStrictEqual( { items:expectedResults});
    });
  });

  describe('*getAllApplicableEmissionsComplianceAttributes', () => {
    it('should call the service and return applicable emissions compliance attributes', async () => {
      const expectedResults: ApplicableComplianceAttributesDTO[] = [];
      jest
        .spyOn(
          emissionsComplianceService,
          'getAllApplicableEmissionsComplianceAttributes',
        )
        .mockResolvedValue(expectedResults);
      expect(
        await emissionsComplianceController.getAllApplicableEmissionsComplianceAttributes(),
      ).toStrictEqual( { items:expectedResults});
    });
  });

  describe('* getAllOwnerOperators', () => {
    it('should call the service and return owner operators ', async () => {
      const expectedResults: OwnerOperatorsDTO[] = [];
      jest
        .spyOn(allowanceComplianceService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await emissionsComplianceController.getAllOwnerOperators()).toStrictEqual( { items:
        expectedResults,}
      );
    });
  });
});
