import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';
import { State } from '@us-epa-camd/easey-common/enums';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { PaginatedEmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
  getManyAndCount: jest.fn(),
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

let filters = new PaginatedEmissionsComplianceParamsDTO();
filters.year = [2019];
filters.page = undefined;
filters.perPage = undefined;
filters.facilityId = [0];
filters.stateCode = [State.AK];
filters.ownerOperator = [''];

describe('-- UnitComplianceDimRepository --', () => {
  let unitComplianceDimRepository: UnitComplianceDimRepository;
  let queryBuilder: any;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UnitComplianceDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    unitComplianceDimRepository = module.get(UnitComplianceDimRepository);
    queryBuilder = module.get(SelectQueryBuilder);
    req = mockRequest('');
    req.res.setHeader.mockReturnValue();

    unitComplianceDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.leftJoin.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockEmissionsCompliance');
    queryBuilder.getManyAndCount.mockReturnValue([
      'mockEmissionsCompliance',
      0,
    ]);
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
    queryBuilder.stream.mockReturnValue('mockStream');
  });

  describe('getEmissionsCompliance', () => {
    it('calls createQueryBuilder and gets all UnitComplianceDim results from the repository', async () => {
      let result = await unitComplianceDimRepository.getEmissionsCompliance(
        new PaginatedEmissionsComplianceParamsDTO(),
        req,
      );

      result = await unitComplianceDimRepository.getEmissionsCompliance(
        filters,
        req,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockEmissionsCompliance');
    });

    it('calls createQueryBuilder and gets page 1 of UnitComplianceDim paginated results from the repository', async () => {
      ResponseHeaders.setPagination = jest
        .fn()
        .mockReturnValue('paginated results');

      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;

      const paginatedResult = await unitComplianceDimRepository.getEmissionsCompliance(
        paginatedFilters,
        req,
      );
      expect(ResponseHeaders.setPagination).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockEmissionsCompliance');
    });
  });

  it('calls createQueryBuilder and gets page 2 of UnitComplianceDim paginated results from the repository', async () => {
    ResponseHeaders.setPagination = jest
      .fn()
      .mockReturnValue('paginated results');

    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;

    const paginatedResult = await unitComplianceDimRepository.getEmissionsCompliance(
      paginatedFilters,
      req,
    );
    expect(ResponseHeaders.setPagination).toHaveBeenCalled();

    expect(paginatedResult).toEqual('mockEmissionsCompliance');
  });

  describe('streamEmissionsCompliance', () => {
    it('streams all emissions compliance data', async () => {
      const result = await unitComplianceDimRepository.streamEmissionsCompliance(
        new PaginatedEmissionsComplianceParamsDTO(),
      );
      expect(result).toEqual('mockStream');
    });
  });

  describe('getAllApplicableEmissionsComplianceAttributes', () => {
    it('calls createQueryBuilder and gets all applicable emissions compliance attributes from the repository', async () => {
      const result = await unitComplianceDimRepository.getAllApplicableEmissionsComplianceAttributes();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockEmissionsCompliance');
    });
  });
});
