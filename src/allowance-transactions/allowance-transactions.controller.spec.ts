import { Test } from '@nestjs/testing';

import { AllowanceTransactionsController } from './allowance-transactions.controller';
import { AllowanceTransactionsService } from './allowance-transactions.service';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Allowance Transactions Controller --', () => {
  let allowanceTransactionsController: AllowanceTransactionsController;
  let allowanceTransactionsService: AllowanceTransactionsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AllowanceTransactionsController],
      providers: [
        AllowanceTransactionsService,
        AllowanceTransactionsMap,
        TransactionBlockDimRepository,
        TransactionOwnerDimRepository,
        OwnerOperatorsMap,
      ],
    }).compile();

    allowanceTransactionsController = module.get(
      AllowanceTransactionsController,
    );
    allowanceTransactionsService = module.get(AllowanceTransactionsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllowanceTransactions', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return allowance transactions ', async () => {
      const expectedResults: AllowanceTransactionsDTO[] = [];
      const paramsDTO = new AllowanceTransactionsParamsDTO();
      jest
        .spyOn(allowanceTransactionsService, 'getAllowanceTransactions')
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceTransactionsController.getAllowanceTransactions(
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
        .spyOn(allowanceTransactionsService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await allowanceTransactionsController.getAllOwnerOperators()).toBe(
        expectedResults,
      );
    });
  });
});
