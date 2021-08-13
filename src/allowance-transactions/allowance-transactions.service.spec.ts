import { Test } from '@nestjs/testing';

import { AllowanceTransactionsService } from './allowance-transactions.service';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';

const mockTransactionBlockDimRepository = () => ({
  getAllowanceTransactions: jest.fn(),
});

const mockAllowanceTransactionsMap = () => ({
  many: jest.fn(),
});

const mockRequest = () => {
  return {
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Allowance Transactions Service --', () => {
  let allowanceTransactionsService;
  let transactionBlockDimRepository;
  let allowanceTransactionsMap;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AllowanceTransactionsService,
        {
          provide: TransactionBlockDimRepository,
          useFactory: mockTransactionBlockDimRepository,
        },
        {
          provide: AllowanceTransactionsMap,
          useFactory: mockAllowanceTransactionsMap,
        },
      ],
    }).compile();

    allowanceTransactionsService = module.get(AllowanceTransactionsService);
    transactionBlockDimRepository = module.get(TransactionBlockDimRepository);
    allowanceTransactionsMap = module.get(AllowanceTransactionsMap);
    req = mockRequest();
    req.res.setHeader.mockReturnValue();
  });

  describe('getAllowanceTransactions', () => {
    it('calls TransactionBlockDimRepository.getAllowanceTransactions() and gets all allowance transactions from the repository', async () => {
      transactionBlockDimRepository.getAllowanceTransactions.mockResolvedValue(
        'list of allowance transactions',
      );
      allowanceTransactionsMap.many.mockReturnValue('mapped DTOs');

      let filters = new AllowanceTransactionsParamsDTO();

      let result = await allowanceTransactionsService.getAllowanceTransactions(
        filters,
        req,
      );
      expect(allowanceTransactionsMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });
});
