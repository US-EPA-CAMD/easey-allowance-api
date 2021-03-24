import { Test } from '@nestjs/testing';

import { AllowanceService } from './allowance.service';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';

const mockAllowanceHoldingDimRepository = () => ({
  getAllowanceHoldings: jest.fn(),
});

const mockAllowanceHoldingsMap = () => ({
  many: jest.fn(),
});

describe('-- Allowance Service --', () => {
  let allowanceService;
  let allowanceHoldingDimRepository;
  let allowanceHoldingsMap;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AllowanceService,
        {
          provide: AllowanceHoldingDimRepository,
          useFactory: mockAllowanceHoldingDimRepository,
        },
        { provide: AllowanceHoldingsMap, useFactory: mockAllowanceHoldingsMap },
      ],
    }).compile();

    allowanceService = module.get(AllowanceService);
    allowanceHoldingDimRepository = module.get(AllowanceHoldingDimRepository);
    allowanceHoldingsMap = module.get(AllowanceHoldingsMap);
  });

  describe('getAllowanceHoldings', () => {
    it('calls AllowanceHoldingDimRepository.getAllowanceHoldings() and gets all allowance holdings from the repository', async () => {
      allowanceHoldingDimRepository.getAllowanceHoldings.mockResolvedValue(
        'list of allowance holdings',
      );
      allowanceHoldingsMap.many.mockReturnValue('mapped DTOs');

      let filters = new AllowanceHoldingsParamsDTO();

      let result = await allowanceService.getAllowanceHoldings(filters);
      expect(allowanceHoldingsMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });

  describe('getAllowanceTransactions', () => {
    it('should return "Hello allowanceTransactions"', async () => {
      expect(allowanceService.getAllowanceTransactions()).toBe(
        'Hello allowanceTransactions',
      );
    });
  });
});
