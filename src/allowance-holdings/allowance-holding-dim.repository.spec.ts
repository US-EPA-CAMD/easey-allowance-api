import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import {
  State,
  ActiveAllowanceProgram,
  AccountType,
} from '@us-epa-camd/easey-common/enums';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { PaginatedAllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
  getManyAndCount: jest.fn(),
  getRawMany: jest.fn(),
  getManyAndCount: jest.fn(),
  select: jest.fn(),
  innerJoin: jest.fn(),
  leftJoin: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
  distinctOn: jest.fn(),
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

let filters: PaginatedAllowanceHoldingsParamsDTO = {
  accountType: [AccountType.GENERAL],
  vintageYear: [2019, 2020],
  page: undefined,
  perPage: undefined,
  accountNumber: ['000127FACLTY'],
  facilityId: [0],
  ownerOperator: [''],
  stateCode: [State.AK],
  programCodeInfo: [ActiveAllowanceProgram.ARP],
};

describe('-- AllowanceHoldingDimRepository --', () => {
  let allowanceHoldingDimRepository: AllowanceHoldingDimRepository;
  let queryBuilder:any;
  let req: any;

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
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();

    allowanceHoldingDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.leftJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAllowanceHoldings');
    queryBuilder.getRawMany.mockReturnValue('mockRawAllowanceHoldings');
    queryBuilder.getManyAndCount.mockReturnValue([
      'mockAllowanceHoldings',
      0,
    ]);
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
    queryBuilder.getQueryAndParameters.mockReturnValue('');
  });

  describe('getAllowanceHoldings', () => {
    it('calls createQueryBuilder and gets all AllowanceHoldingDim results from the repository', async () => {
      const emptyFilters: PaginatedAllowanceHoldingsParamsDTO = new PaginatedAllowanceHoldingsParamsDTO();

      let result = await allowanceHoldingDimRepository.getAllowanceHoldings(
        emptyFilters, req
      );

      result = await allowanceHoldingDimRepository.getAllowanceHoldings(
        filters, req
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceHoldings');
    });

    it('calls createQueryBuilder and gets page 1 of AllowanceHoldingDim paginated results from the repository', async () => {
      ResponseHeaders.setPagination = jest
        .fn()
        .mockReturnValue('paginated results');
      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;

      const paginatedResult = await allowanceHoldingDimRepository.getAllowanceHoldings(
        paginatedFilters,
        req,
      );
      expect(ResponseHeaders.setPagination).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAllowanceHoldings');
    });
  });
  it('calls createQueryBuilder and gets page 2 of AllowanceHoldingDim paginated results from the repository', async () => {
    ResponseHeaders.setPagination = jest
      .fn()
      .mockReturnValue('paginated results');

    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;

    const paginatedResult = await allowanceHoldingDimRepository.getAllowanceHoldings(
      paginatedFilters,
      req,
    );
    expect(ResponseHeaders.setPagination).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAllowanceHoldings');
  });

  describe('getAllApplicableAllowanceHoldingsAttributes', () => {
    it('calls createQueryBuilder and gets all applicable allowance holdings attributes from the repository', async () => {
      let result = await allowanceHoldingDimRepository.getAllApplicableAllowanceHoldingsAttributes();
      expect(queryBuilder.getRawMany).toHaveBeenCalled();
      expect(result).toEqual('mockRawAllowanceHoldings');
    });
  });
});
