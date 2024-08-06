import { Test } from '@nestjs/testing';
import {
  AccountType,
  AllowanceProgram,
  State,
  TransactionType,
} from '@us-epa-camd/easey-common/enums';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';
import { EntityManager, SelectQueryBuilder } from 'typeorm';

import { PaginatedAllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';

const mockQueryBuilder = () => ({
  where: jest.fn(),
  andWhere: jest.fn(),
  getMany: jest.fn(),
  getRawMany: jest.fn(),
  getManyAndCount: jest.fn(),
  select: jest.fn(),
  innerJoin: jest.fn(),
  leftJoin: jest.fn(),
  distinctOn: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
  getQueryAndParameters: jest.fn(),
});

const mockRequest = (url?: string, page?: number, perPage?: number) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
    query: {
      page,
      perPage,
    },
  };
};

let filters = new PaginatedAllowanceTransactionsParamsDTO();
filters.accountType = [AccountType.GENERAL];
filters.vintageYear = [2019, 2020];
filters.page = undefined;
filters.perPage = undefined;
filters.accountNumber = ['000127FACLTY'];
filters.facilityId = [0];
filters.ownerOperator = [''];
filters.stateCode = [State.AK];
filters.programCodeInfo = [AllowanceProgram.ARP];
filters.transactionBeginDate = new Date();
filters.transactionEndDate = new Date();
filters.transactionType = [TransactionType.ACTIVATE_CONDITIONAL_ALLOWANCES];

describe('-- TransactionBlockDimRepository --', () => {
  let transactionBlockDimRepository: TransactionBlockDimRepository;
  let queryBuilder: any;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EntityManager,
        TransactionBlockDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    transactionBlockDimRepository = module.get(TransactionBlockDimRepository);
    queryBuilder = module.get(SelectQueryBuilder);
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();

    transactionBlockDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.leftJoin.mockReturnValue(queryBuilder);
    queryBuilder.where.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAllowanceTransactions');
    queryBuilder.getRawMany.mockReturnValue('mockRawAllowanceTransactions');
    queryBuilder.getManyAndCount.mockReturnValue([
      'mockAllowanceTransactions',
      0,
    ]);
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
    queryBuilder.getQueryAndParameters.mockReturnValue('');
  });

  describe('getAllowanceTransactions', () => {
    it('calls createQueryBuilder and gets all TransactionsBlockDim results from the repository with no filters', async () => {
      let result = await transactionBlockDimRepository.getAllowanceTransactions(
        new PaginatedAllowanceTransactionsParamsDTO(),
        req,
      );

      result = await transactionBlockDimRepository.getAllowanceTransactions(
        filters,
        req,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceTransactions');
    });

    it('calls createQueryBuilder and gets page 1 of TransactionBlockDim paginated results from the repository', async () => {
      ResponseHeaders.setPagination = jest
        .fn()
        .mockReturnValue('pagianted results');

      let pagiantedFilters = filters;
      pagiantedFilters.page = 1;
      pagiantedFilters.perPage = 10;

      const paginatedResult = await transactionBlockDimRepository.getAllowanceTransactions(
        pagiantedFilters,
        req,
      );
      expect(ResponseHeaders.setPagination).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAllowanceTransactions');
    });
  });
  it('calls createQueryBuilder and gets page 2 of TransactionBlockDim paginated results from the repository', async () => {
    ResponseHeaders.setPagination = jest
      .fn()
      .mockReturnValue('pagianted results');

    let pagiantedFilters = filters;
    pagiantedFilters.page = 2;
    pagiantedFilters.perPage = 10;

    const paginatedResult = await transactionBlockDimRepository.getAllowanceTransactions(
      pagiantedFilters,
      req,
    );
    expect(ResponseHeaders.setPagination).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAllowanceTransactions');
  });

  describe('getAllApplicableAllowanceTransactionsAttributes', () => {
    it('calls createQueryBuilder and gets all applicable allowance transactions attributes from the repository', async () => {
      let filters: ApplicableAllowanceTransactionsAttributesParamsDTO = new ApplicableAllowanceTransactionsAttributesParamsDTO();
      filters.transactionBeginDate = new Date();
      filters.transactionEndDate = new Date();

      let result = await transactionBlockDimRepository.getAllApplicableAllowanceTransactionsAttributes(
        filters,
      );
      expect(queryBuilder.getRawMany).toHaveBeenCalled();
      expect(result).toEqual('mockRawAllowanceTransactions');
    });
  });
});
