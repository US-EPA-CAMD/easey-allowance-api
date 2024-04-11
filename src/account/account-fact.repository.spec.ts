import { Test } from '@nestjs/testing';
import {
  AccountType,
  AllowanceProgram,
  State,
} from '@us-epa-camd/easey-common/enums';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';
import { EntityManager, SelectQueryBuilder } from 'typeorm';

import { PaginatedAccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';
import { AccountFact } from '../entities/account-fact.entity';
import { AccountFactRepository } from './account-fact.repository';

const mockQueryBuilder = () => ({
  select: jest.fn(),
  distinctOn: jest.fn(),
  andWhere: jest.fn(),
  getMany: jest.fn(),
  getManyAndCount: jest.fn(),
  getRawMany: jest.fn(),
  innerJoin: jest.fn(),
  leftJoin: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
  getQueryAndParameters: jest.fn(),
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
  let accountFactRepository: AccountFactRepository;
  let queryBuilder: any;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountFactRepository,
        EntityManager,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    accountFactRepository = module.get<AccountFactRepository>(
      AccountFactRepository,
    );

    queryBuilder = module.get<SelectQueryBuilder<AccountFact>>(
      SelectQueryBuilder,
    );
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();

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
    queryBuilder.getManyAndCount.mockReturnValue(['mockAccount', 0]);
    queryBuilder.getRawMany.mockReturnValue('mockRawAccount');
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
    queryBuilder.getQueryAndParameters.mockReturnValue('');
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
        req,
      );

      result = await accountFactRepository.getAllAccountAttributes(
        filters,
        req,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAccount');
    });

    it('calls createQueryBuilder and gets page 1 of AccountAttributes paginated results from the repository', async () => {
      ResponseHeaders.setPagination = jest
        .fn()
        .mockReturnValue('paginated results');

      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;

      const paginatedResult = await accountFactRepository.getAllAccountAttributes(
        paginatedFilters,
        req,
      );
      expect(ResponseHeaders.setPagination).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAccount');
    });
  });
  it('calls createQueryBuilder and gets page 2 of AccountAttributes paginated results from the repository', async () => {
    ResponseHeaders.setPagination = jest
      .fn()
      .mockReturnValue('paginated results');

    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;

    const paginatedResult = await accountFactRepository.getAllAccountAttributes(
      paginatedFilters,
      req,
    );
    expect(ResponseHeaders.setPagination).toHaveBeenCalled();
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
