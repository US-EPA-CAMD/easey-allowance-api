import { Test } from '@nestjs/testing';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { State } from '@us-epa-camd/easey-common/enums';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceController } from './allowance-compliance.controller';
import { AllowanceComplianceService } from './allowance-compliance.service';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { PaginatedAllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { ApplicableAllowanceComplianceAttributesDTO } from '../dto/applicable-allowance-compliance-attributes.dto';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Allowance Compliance Controller --', () => {
  let allowanceComplianceController: AllowanceComplianceController;
  let allowanceComplianceService: AllowanceComplianceService;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [AllowanceComplianceController],
      providers: [
        AllowanceComplianceService,
        AllowanceComplianceMap,
        AccountComplianceDimRepository,
        OwnerYearDimRepository,
        OwnerOperatorsMap,
        ApplicableAllowanceComplianceAttributesMap,
      ],
    }).compile();

    allowanceComplianceController = module.get(AllowanceComplianceController);
    allowanceComplianceService = module.get(AllowanceComplianceService);
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllowanceCompliance', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return allowance compliance data ', async () => {
      const expectedResults: AllowanceComplianceDTO[] = [];
      const paramsDTO: PaginatedAllowanceComplianceParamsDTO = new PaginatedAllowanceComplianceParamsDTO();
      paramsDTO.year = [2019];
      paramsDTO.page = undefined;
      paramsDTO.perPage = undefined;
      paramsDTO.facilityId = [0];
      paramsDTO.ownerOperator = [''];
      paramsDTO.stateCode = [State.AK];
      paramsDTO.programCodeInfo = [AllowanceProgram.OTC];

      jest
        .spyOn(allowanceComplianceService, 'getAllowanceCompliance')
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceComplianceController.getAllowanceCompliance(
          paramsDTO,
          req,
        ),
      ).toBe(expectedResults);
    });
  });

  describe('*getAllAplicableAllowanceComplianceAttributes', () => {
    it('should call the service and return applicable allowance compliance attributes', async () => {
      const expectedResults: ApplicableAllowanceComplianceAttributesDTO[] = [];
      jest
        .spyOn(
          allowanceComplianceService,
          'getAllApplicableAllowanceComplianceAttributes',
        )
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceComplianceController.getAllApplicableAllowanceComplianceAttributes(),
      ).toBe(expectedResults);
    });
  });

  describe('* getAllOwnerOperators', () => {
    it('should call the service and return owner operators ', async () => {
      const expectedResults: OwnerOperatorsDTO[] = [];
      jest
        .spyOn(allowanceComplianceService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await allowanceComplianceController.getAllOwnerOperators()).toBe(
        expectedResults,
      );
    });
  });
});
