import { Test } from '@nestjs/testing';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { EmissionsComplianceController } from './emissions-compliance.controller';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { AccountComplianceDimRepository } from '../allowance-compliance/account-compliance-dim.repository';
import { OwnerYearDimRepository } from '../allowance-compliance/owner-year-dim.repository';

describe('-- Emissions Compliance Controller --', () => {
  let emissionsComplianceController: EmissionsComplianceController;
  let allowanceComplianceService: AllowanceComplianceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EmissionsComplianceController],
      providers: [
        AllowanceComplianceService,
        AllowanceComplianceMap,
        AccountComplianceDimRepository,
        OwnerYearDimRepository,
        OwnerOperatorsMap,
      ],
    }).compile();

    emissionsComplianceController = module.get(EmissionsComplianceController);
    allowanceComplianceService = module.get(AllowanceComplianceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
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
