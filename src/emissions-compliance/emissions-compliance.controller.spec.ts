import { Test } from '@nestjs/testing';
import { State } from '@us-epa-camd/easey-common/enums';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { StreamableFile } from '@nestjs/common';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { EmissionsComplianceController } from './emissions-compliance.controller';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { AccountComplianceDimRepository } from '../allowance-compliance/account-compliance-dim.repository';
import { OwnerYearDimRepository } from '../allowance-compliance/owner-year-dim.repository';
import { EmissionsComplianceService } from './emissions-compliance.service';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import {
  PaginatedEmissionsComplianceParamsDTO,
  StreamEmissionsComplianceParamsDTO,
} from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';
import { StreamModule } from '@us-epa-camd/easey-common/stream';

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
      imports: [LoggerModule, StreamModule],
      controllers: [EmissionsComplianceController],
      providers: [
        AllowanceComplianceService,
        EmissionsComplianceService,
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
      ).toBe(expectedResults);
    });
  });

  describe('* streamEmissionsCompliance', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return all emissions compliance data ', async () => {
      const expectedResults: StreamableFile = undefined;
      const paramsDTO = new StreamEmissionsComplianceParamsDTO();
      jest
        .spyOn(emissionsComplianceService, 'streamEmissionsCompliance')
        .mockResolvedValue(expectedResults);
      expect(
        await emissionsComplianceController.streamEmissionsCompliance(
          req,
          paramsDTO,
        ),
      ).toBe(expectedResults);
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
      ).toBe(expectedResults);
    });
  });

  describe('* getAllOwnerOperators', () => {
    it('should call the service and return owner operators ', async () => {
      const expectedResults: OwnerOperatorsDTO[] = [];
      jest
        .spyOn(allowanceComplianceService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await emissionsComplianceController.getAllOwnerOperators()).toBe(
        expectedResults,
      );
    });
  });
});
