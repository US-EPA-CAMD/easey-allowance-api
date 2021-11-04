import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { AllowanceTransactionsService } from './allowance-transactions.service';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { TransactionOwnerDim } from '../entities/transaction-owner-dim.entity';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { ApplicableAllowanceTransactionsAttributesMap } from '../maps/applicable-allowance-transactions-attributtes.map';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';

const mockTransactionBlockDimRepository = () => ({
  getAllowanceTransactions: jest.fn(),
  getAllApplicableAllowanceTransactionsAttributes: jest.fn(),
});

const mockAllowanceTransactionsMap = () => ({
  many: jest.fn(),
});

const mockTransactionOwnerDimRepository = () => ({
  getAllOwnerOperators: jest.fn(),
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
  let transactionOwnerDimRepository;
  let allowanceTransactionsMap;
  let applicableAllowanceTransactionsAttributesMap;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AllowanceTransactionsService,
        {
          provide: TransactionBlockDimRepository,
          useFactory: mockTransactionBlockDimRepository,
        },
        {
          provide: TransactionOwnerDimRepository,
          useFactory: mockTransactionOwnerDimRepository,
        },
        {
          provide: AllowanceTransactionsMap,
          useFactory: mockAllowanceTransactionsMap,
        },
        {
          provide: ApplicableAllowanceTransactionsAttributesMap,
          useFactory: mockAllowanceTransactionsMap,
        },
        OwnerOperatorsMap,
      ],
    }).compile();

    allowanceTransactionsService = module.get(AllowanceTransactionsService);
    transactionBlockDimRepository = module.get(TransactionBlockDimRepository);
    transactionOwnerDimRepository = module.get(TransactionOwnerDimRepository);
    allowanceTransactionsMap = module.get(AllowanceTransactionsMap);
    applicableAllowanceTransactionsAttributesMap = module.get(ApplicableAllowanceTransactionsAttributesMap)
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

  describe('getAllOwnerOperators', () => {
    it('repository.getAllOwnerOperators() and returns all valid owner/operators', async () => {
      let transactionOwnerDimEntity: TransactionOwnerDim = new TransactionOwnerDim();
      transactionOwnerDimEntity.ownId = 0;
      transactionOwnerDimEntity.ownerOperator = '';
      transactionOwnerDimEntity.ownType = '';

      const ownerOperatorsDTO: OwnerOperatorsDTO = {
        ownerOperator: '',
        ownType: '',
      };

      transactionOwnerDimRepository.getAllOwnerOperators.mockResolvedValue([
        transactionOwnerDimEntity,
      ]);

      let result = await allowanceTransactionsService.getAllOwnerOperators();

      expect(
        transactionOwnerDimRepository.getAllOwnerOperators,
      ).toHaveBeenCalled();
      expect(result).toEqual([ownerOperatorsDTO]);
    });
  });

  describe('getAllApplicableAllowanceTransactionsAttributes', () => {
    it('call TransactionBlockDimRepository.getAllApplicableAllowanceTransactionsAttributes.mockResolvedValue', async () => {
      let filters = new ApplicableAllowanceTransactionsAttributesParamsDTO();

      transactionBlockDimRepository.getAllApplicableAllowanceTransactionsAttributes.mockResolvedValue(
        'list of applicable allowance transactions attributes',
      );

      applicableAllowanceTransactionsAttributesMap.many.mockReturnValue(
        'mapped DTOs',
      );

      const result = await allowanceTransactionsService.getAllApplicableAllowanceTransactionsAttributes(
        filters,
      );
      expect(
        applicableAllowanceTransactionsAttributesMap.many,
      ).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });
});
