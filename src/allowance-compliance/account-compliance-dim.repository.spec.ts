import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { State, AllowanceProgram } from '@us-epa-camd/easey-common/enums';

import { PaginatedAllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
  getManyAndCount: jest.fn(),
  getRawMany: jest.fn(),
  select: jest.fn(),
  leftJoin: jest.fn(),
  innerJoin: jest.fn(),
  orderBy: jest.fn(),
  addOrderBy: jest.fn(),
  getCount: jest.fn(),
  skip: jest.fn(),
  take: jest.fn(),
  distinctOn: jest.fn(),
  stream: jest.fn(),
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

let filters = new PaginatedAllowanceComplianceParamsDTO();
filters.year = [2019];
filters.page = undefined;
filters.perPage = undefined;
filters.facilityId = [0];
filters.ownerOperator = [''];
filters.stateCode = [State.AK];
filters.programCodeInfo = [AllowanceProgram.OTC];

describe('-- AccountComplianceDimRepository --', () => {
  let repository: AccountComplianceDimRepository;
  let queryBuilder: any;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountComplianceDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    repository = module.get(AccountComplianceDimRepository);
    queryBuilder = module.get(SelectQueryBuilder);

    req = mockRequest('');
    req.res.setHeader.mockReturnValue();

    repository.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.leftJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAllowanceCompliance');
    queryBuilder.getRawMany.mockReturnValue(
      'mockApplicableAllowanceComplianceAttributes',
    );
    queryBuilder.getManyAndCount.mockReturnValue([
      'mockAllowanceCompliance',
      0,
    ]);
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
    queryBuilder.stream.mockReturnValue('mockStream');
  });

  describe('getAllowanceCompliance', () => {
    it('calls createQueryBuilder and gets all AccountComplianceDim results from the repository with no filters', async () => {
      let result = await repository.getAllowanceCompliance(
        new PaginatedAllowanceComplianceParamsDTO(),
        req,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceCompliance');
    });

    it('calls createQueryBuilder and gets all AccountComplianceDim results from the repository with filters', async () => {
      const result = await repository.getAllowanceCompliance(filters, req);
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceCompliance');
    });

    it('calls createQueryBuilder and gets page 1 of AccountComplianceDim paginated results from the repository', async () => {
      ResponseHeaders.setPagination = jest
        .fn()
        .mockReturnValue('paginated results');

      let pagiantedFilters = filters;
      pagiantedFilters.page = 1;
      pagiantedFilters.perPage = 10;

      const paginatedResult = await repository.getAllowanceCompliance(
        pagiantedFilters,
        req,
      );

      expect(ResponseHeaders.setPagination).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAllowanceCompliance');
    });
  });

  it('calls createQueryBuilder and gets page 2 of AccountComplianceDim paginated results from the repository', async () => {
    ResponseHeaders.setPagination = jest
      .fn()
      .mockReturnValue('paginated results');

    let pagiantedFilters = filters;
    pagiantedFilters.page = 2;
    pagiantedFilters.perPage = 10;

    const paginatedResult = await repository.getAllowanceCompliance(
      pagiantedFilters,
      req,
    );

    expect(ResponseHeaders.setPagination).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAllowanceCompliance');
  });

  describe('streamAllowanceCompliance', () => {
    it('streams all allowance compliance', async () => {
      const result = await repository.streamAllowanceCompliance(
        new PaginatedAllowanceComplianceParamsDTO(),
      );

      expect(result).toEqual('mockStream');
    });
  });

  describe('getAllApplicableAllowanceComplianceAttributes', () => {
    it('calls createQueryBuilder and gets all applicable allowance compliance attributes from the repository', async () => {
      const result = await repository.getAllApplicableAllowanceComplianceAttributes();
      expect(queryBuilder.getRawMany).toHaveBeenCalled();
      expect(result).toEqual('mockApplicableAllowanceComplianceAttributes');
    });
  });
});
