import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import {
  State,
  AccountType,
  AllowanceProgram,
} from '@us-epa-camd/easey-common/enums';

import { AccountFactRepository } from './account-fact.repository';
import { AccountFact } from '../entities/account-fact.entity';
import {
  PaginatedAccountAttributesParamsDTO,
  StreamAccountAttributesParamsDTO,
} from '../dto/account-attributes.params.dto';

const mockQueryBuilder = () => ({
  select: jest.fn(),
  distinctOn: jest.fn(),
  andWhere: jest.fn(),
  getMany: jest.fn(),
  getRawMany: jest.fn(),
  innerJoin: jest.fn(),
  leftJoin: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
  stream: jest.fn(),
});

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

let filters: PaginatedAccountAttributesParamsDTO = {
  accountType: [AccountType.GENERAL],
  page: undefined,
  perPage: undefined,
  accountNumber: ['000127FACLTY'],
  facilityId: [0],
  ownerOperator: [''],
  stateCode: [State.AK],
  programCodeInfo: [AllowanceProgram.ARP],
};

describe('AccountFactRepository', () => {
  let accountFactRepository;
  let queryBuilder;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountFactRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    accountFactRepository = module.get<AccountFactRepository>(
      AccountFactRepository,
    );

    queryBuilder = module.get<SelectQueryBuilder<AccountFact>>(
      SelectQueryBuilder,
    );

    accountFactRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.leftJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAccount');
    queryBuilder.getRawMany.mockReturnValue('mockRawAccount');
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
    queryBuilder.stream.mockReturnValue('mockStream');
  });

  describe('streamAccountAttributes', () => {
    it('streams all account attributes', async () => {
      const result = await accountFactRepository.streamAllAccountAttributes(
        new StreamAccountAttributesParamsDTO(),
      );

      expect(result).toEqual('mockStream');
    });
  });

  describe('getAllAccounts', () => {
    it('calls createQueryBuilder and gets all accounts from the repository', async () => {
      let result = await accountFactRepository.getAllAccounts();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAccount');
    });
  });

  describe('getAllAccountAttributes', () => {
    it('calls createQueryBuilder and gets all AccountAttributes results from the repository', async () => {
      const emptyFilters: PaginatedAccountAttributesParamsDTO = new PaginatedAccountAttributesParamsDTO();

      let result = await accountFactRepository.getAllAccountAttributes(
        emptyFilters,
      );

      result = await accountFactRepository.getAllAccountAttributes(filters);

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAccount');
    });

    it('calls createQueryBuilder and gets page 1 of AccountAttributes paginated results from the repository', async () => {
      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;
      let req: any = mockRequest(
        `/accounts/attributes?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      let paginatedResult = await accountFactRepository.getAllAccountAttributes(
        paginatedFilters,
        req,
      );
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAccount');
    });
  });
  it('calls createQueryBuilder and gets page 2 of AccountAttributes paginated results from the repository', async () => {
    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;
    let req: any = mockRequest(
      `/accounts/attributes?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
    );
    req.res.setHeader.mockReturnValue();
    let paginatedResult = await accountFactRepository.getAllAccountAttributes(
      paginatedFilters,
      req,
    );
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAccount');
  });

  describe('getAllApplicableAccountAttributes', () => {
    it('calls createQueryBuilder and gets all applicable account attributes from the repository', async () => {
      let result = await accountFactRepository.getAllApplicableAccountAttributes();
      expect(queryBuilder.getRawMany).toHaveBeenCalled();
      expect(result).toEqual('mockRawAccount');
    });
  });
});
