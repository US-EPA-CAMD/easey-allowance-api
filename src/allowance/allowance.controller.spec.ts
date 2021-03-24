import { Test } from '@nestjs/testing';

import { AllowanceController } from './allowance.controller';
import { AllowanceService } from './allowance.service';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';

describe('-- Allowance Controller --', () => {
  let allowanceController: AllowanceController;
  let allowanceService: AllowanceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AllowanceController],
      providers: [
        AllowanceService,
        AllowanceHoldingsMap,
        AllowanceHoldingDimRepository,
      ],
    }).compile();

    allowanceController = module.get(AllowanceController);
    allowanceService = module.get(AllowanceService);

    allowanceService.getAllowanceTransactions = jest
      .fn()
      .mockReturnValue('Hello allowanceTransactions');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllowanceHoldings', () => {
    it('should call the service and return allowance holdings ', async () => {
      const expectedResults: AllowanceHoldingsDTO[] = [];
      const paramsDTO = new AllowanceHoldingsParamsDTO();
      jest
        .spyOn(allowanceService, 'getAllowanceHoldings')
        .mockResolvedValue(expectedResults);
      expect(await allowanceController.getAllowanceHoldings(paramsDTO)).toBe(
        expectedResults,
      );
    });
  });

  describe('* getAllowanceTransactions', () => {
    it('should return "Hello allowanceTransactions"', () => {
      expect(allowanceController.getAllowanceTransactions()).toBe(
        'Hello allowanceTransactions',
      );
    });
  });
});
