import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { AccountFactRepository } from './account-fact.repository';
import { AccountFact } from '../entities/account-fact.entity';
import { AccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';
import { State } from '../enum/state.enum';
import { AccountType } from '../enum/account-type.enum';
import { AllowanceProgram } from '../enum/allowance-programs.enum';

const mockQueryBuilder = () => ({
  select: jest.fn(),
  distinctOn: jest.fn(),
  andWhere: jest.fn(),
  getMany: jest.fn(),
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

let filters: AccountAttributesParamsDTO = {
  accountType: [AccountType.GENERAL],
  page: undefined,
  perPage: undefined,
  accountNumber: ['000127FACLTY'],
  orisCode: [0],
  ownerOperator: [''],
  state: [State.AK],
  program: [AllowanceProgram.ARP],
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
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAccount');
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
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
      const emptyFilters: AccountAttributesParamsDTO = new AccountAttributesParamsDTO();

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
      expect(req.res.setHeader).toHaveBeenCalled();
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
    expect(req.res.setHeader).toHaveBeenCalled();
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAccount');
  });
});
