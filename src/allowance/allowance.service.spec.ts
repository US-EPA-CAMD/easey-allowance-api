import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import appConfig from '../config/app.config';
import dbConfig from '../config/db.config';
import { AllowanceService } from './allowance.service';


describe('AllowanceService', () => {
  let allowanceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [dbConfig, appConfig],
        }),
      ],

      providers: [AllowanceService],
    }).compile();

    allowanceService = module.get(AllowanceService);
  });

  describe('getAllowanceHoldings', () => {
    it('should return "Hello allowanceHoldings"', async () => {
      expect(allowanceService.getAllowanceHoldings()).toBe('Hello allowanceHoldings');
    });
  });
  describe('getAllowanceTransactions', () => {
    it('should return "Hello allowanceTransactions"', async () => {
      expect(allowanceService.getAllowanceTransactions()).toBe('Hello allowanceTransactions');
    });
  });
});