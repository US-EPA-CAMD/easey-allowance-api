import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import { State } from '../enum/state.enum';
import { ActiveAllowanceProgram } from '../enum/active-allowance-program.enum';
import { AccountType } from '../enum/account-type.enum';

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

let filters: AllowanceHoldingsParamsDTO = {
  accountType: [AccountType.GENERAL],
  vintageYear: [2019, 2020],
  page: undefined,
  perPage: undefined,
  accountNumber: ['000127FACLTY'],
  orisCode: [0],
  ownerOperator: [''],
  state: [State.AK],
  program: [ActiveAllowanceProgram.ARP],
};

describe('-- AllowanceHoldingDimRepository --', () => {
  let allowanceHoldingDimRepository;
  let queryBuilder;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AllowanceHoldingDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    allowanceHoldingDimRepository = module.get<AllowanceHoldingDimRepository>(
      AllowanceHoldingDimRepository,
    );
    queryBuilder = module.get<SelectQueryBuilder<AllowanceHoldingDim>>(
      SelectQueryBuilder,
    );

    allowanceHoldingDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAllowanceHoldings');
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
  });

  describe('getAllowanceHoldings', () => {
    it('calls createQueryBuilder and gets all AllowanceHoldingDim results from the repository', async () => {
      const emptyFilters: AllowanceHoldingsParamsDTO = new AllowanceHoldingsParamsDTO();

      let result = await allowanceHoldingDimRepository.getAllowanceHoldings(
        emptyFilters,
      );

      result = await allowanceHoldingDimRepository.getAllowanceHoldings(
        filters,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceHoldings');
    });

    it('calls createQueryBuilder and gets page 1 of AllowanceHoldingDim paginated results from the repository', async () => {
      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;
      let req: any = mockRequest(
        `/holdings?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      let paginatedResult = await allowanceHoldingDimRepository.getAllowanceHoldings(
        paginatedFilters,
        req,
      );
      expect(req.res.setHeader).toHaveBeenCalled();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAllowanceHoldings');
    });
  });
  it('calls createQueryBuilder and gets page 2 of AllowanceHoldingDim paginated results from the repository', async () => {
    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;
    let req: any = mockRequest(
      `/holdings?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
    );
    req.res.setHeader.mockReturnValue();
    let paginatedResult = await allowanceHoldingDimRepository.getAllowanceHoldings(
      paginatedFilters,
      req,
    );
    expect(req.res.setHeader).toHaveBeenCalled();
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAllowanceHoldings');
  });
});
