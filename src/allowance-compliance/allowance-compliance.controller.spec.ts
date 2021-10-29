import { Test } from '@nestjs/testing';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { State } from '@us-epa-camd/easey-common/enums';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceController } from './allowance-compliance.controller';
import { AllowanceComplianceService } from './allowance-compliance.service';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

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
      ],
    }).compile();

    allowanceComplianceController = module.get(AllowanceComplianceController);
    allowanceComplianceService = module.get(AllowanceComplianceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllowanceCompliance', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return allowance compliance data ', async () => {
      const expectedResults: AllowanceComplianceDTO[] = [];
      const paramsDTO: AllowanceComplianceParamsDTO = {
        year: [2019],
        page: undefined,
        perPage: undefined,
        facilityId: [0],
        ownerOperator: [''],
        state: [State.AK],
        programCodeInfo: [AllowanceProgram.OTC],
      };
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
