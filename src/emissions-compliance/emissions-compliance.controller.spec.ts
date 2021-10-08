import { Test } from '@nestjs/testing';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { EmissionsComplianceController } from './emissions-compliance.controller';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { AccountComplianceDimRepository } from '../allowance-compliance/account-compliance-dim.repository';
import { OwnerYearDimRepository } from '../allowance-compliance/owner-year-dim.repository';
import { EmissionsComplianceService } from './emissions-compliance.service';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { State } from '../enum/state.enum';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
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
      const paramsDTO: EmissionsComplianceParamsDTO = {
        year: [2019],
        page: undefined,
        perPage: undefined,
        facilityId: [0],
        ownerOperator: [''],
        state: [State.AK],
      };
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
