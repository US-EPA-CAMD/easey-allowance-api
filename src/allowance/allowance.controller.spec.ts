import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import appConfig from '../config/app.config';
import dbConfig from '../config/db.config';
import { AllowanceController } from './allowance.controller';
import { AllowanceService } from './allowance.service';

describe('AllowanceController', () => {
  let allowanceController: AllowanceController;
  let allowanceService: AllowanceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [dbConfig, appConfig],
        }),
      ],
      controllers: [AllowanceController],
      providers: [AllowanceService],
    }).compile();

    allowanceController = module.get(AllowanceController);
    allowanceService = module.get(AllowanceService);
    allowanceService.getAllowanceHoldings = jest
      .fn()
      .mockReturnValue('Hello allowanceHoldings');
    allowanceService.getAllowanceTransactions = jest
      .fn()
      .mockReturnValue('Hello allowanceTransactions');
  });
  describe('getAllowanceHoldings', () => {
    it('should return "Hello allowanceHoldings"', () => {
      expect(allowanceController.getAllowanceHoldings()).toBe(
        'Hello allowanceHoldings',
      );
    });
  });
  describe('getAllowanceTransactions', () => {
    it('should return "Hello allowanceTransactions"', () => {
      expect(allowanceController.getAllowanceTransactions()).toBe(
        'Hello allowanceTransactions',
      );
    });
  });
});
