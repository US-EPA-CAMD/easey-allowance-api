import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { State } from '../enum/state.enum';
import { AccountType } from '../enum/account-type.enum';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { AllowanceProgram } from '../enum/allowance-programs.enum';
import { TransactionType } from '../enum/transaction-type.enum';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { TransactionBlockDim } from '../entities/transaction-block-dim.entity';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
  select: jest.fn(),
  innerJoin: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
});

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

let filters: AllowanceTransactionsParamsDTO = {
  accountType: [AccountType.GENERAL],
  vintageYear: [2019, 2020],
  page: undefined,
  perPage: undefined,
  accountNumber: ['000127FACLTY'],
  facilityId: [0],
  ownerOperator: [''],
  state: [State.AK],
  programCodeInfo: [AllowanceProgram.ARP],
  transactionBeginDate: new Date(),
  transactionEndDate: new Date(),
  transactionType: [TransactionType.ACTIVATE_CONDITIONAL_ALLOWANCES],
};

describe('-- TransactionBlockDimRepository --', () => {
  let transactionBlockDimRepository;
  let queryBuilder;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TransactionBlockDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    transactionBlockDimRepository = module.get<TransactionBlockDimRepository>(
      TransactionBlockDimRepository,
    );
    queryBuilder = module.get<SelectQueryBuilder<TransactionBlockDim>>(
      SelectQueryBuilder,
    );

    transactionBlockDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAllowanceTransactions');
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
  });

  describe('getAllowanceTransactions', () => {
    it('calls createQueryBuilder and gets all TransactionsBlockDim results from the repository', async () => {
      const emptyFilters: AllowanceTransactionsParamsDTO = new AllowanceTransactionsParamsDTO();

      let result = await transactionBlockDimRepository.getAllowanceTransactions(
        emptyFilters,
      );

      result = await transactionBlockDimRepository.getAllowanceTransactions(
        filters,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceTransactions');
    });

    it('calls createQueryBuilder and gets page 1 of TransactionBlockDim paginated results from the repository', async () => {
      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;
      let req: any = mockRequest(
        `/allowance-transactions?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      let paginatedResult = await transactionBlockDimRepository.getAllowanceTransactions(
        paginatedFilters,
        req,
      );
      expect(req.res.setHeader).toHaveBeenCalled();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAllowanceTransactions');
    });
  });
  it('calls createQueryBuilder and gets page 2 of TransactionBlockDim paginated results from the repository', async () => {
    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;
    let req: any = mockRequest(
      `/allowance-transactions?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
    );
    req.res.setHeader.mockReturnValue();
    let paginatedResult = await transactionBlockDimRepository.getAllowanceTransactions(
      paginatedFilters,
      req,
    );
    expect(req.res.setHeader).toHaveBeenCalled();
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAllowanceTransactions');
  });
});
