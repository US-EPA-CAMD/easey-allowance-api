import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { EntityManager } from 'typeorm';

import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';
import { PaginatedAllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { ApplicableAllowanceTransactionsAttributesDTO } from '../dto/applicable-allowance-transactions-attributes.dto';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceTransactionsController } from './allowance-transactions.controller';
import { AllowanceTransactionsService } from './allowance-transactions.service';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';

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
      imports: [LoggerModule],
      controllers: [AllowanceTransactionsController],
      providers: [
        AllowanceTransactionsService,
        AllowanceTransactionsMap,
        EntityManager,
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
      const paramsDTO = new PaginatedAllowanceTransactionsParamsDTO();
      jest
        .spyOn(allowanceTransactionsService, 'getAllowanceTransactions')
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceTransactionsController.getAllowanceTransactions(
          paramsDTO,
          req,
        ),
      ).toStrictEqual( { items:expectedResults });
    });
  });

  describe('* getAllOwnerOperators', () => {
    it('should call the service and return owner operators ', async () => {
      const expectedResults: OwnerOperatorsDTO[] = [];
      jest
        .spyOn(allowanceTransactionsService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await allowanceTransactionsController.getAllOwnerOperators()).toStrictEqual( { items:
        expectedResults,}
      );
    });
  });

  describe('* getAllApplicableAllowanceTransactionsAttributes', () => {
    it('should call the service and return applicable allowance transactions attributes', async () => {
      const expectedResults: ApplicableAllowanceTransactionsAttributesDTO[] = [];
      const paramsDTO = new ApplicableAllowanceTransactionsAttributesParamsDTO();
      jest
        .spyOn(
          allowanceTransactionsService,
          'getAllApplicableAllowanceTransactionsAttributes',
        )
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceTransactionsController.getAllApplicableAllowanceTransactionsAttributes(
          paramsDTO,
        ),
      ).toStrictEqual( { items:expectedResults});
    });
  });
});
