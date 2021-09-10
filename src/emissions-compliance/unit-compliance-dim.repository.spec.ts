import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { UnitComplianceDim } from '../entities/unit-compliance-dim.entity';
import { State } from '../enum/state.enum';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';

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

let filters: EmissionsComplianceParamsDTO = {
  year: [2019, 2020],
  page: undefined,
  perPage: undefined,
  orisCode: [0],
  ownerOperator: [''],
  state: [State.AK],
};

describe('-- UnitComplianceDimRepository --', () => {
  let unitComplianceDimRepository;
  let queryBuilder;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UnitComplianceDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    unitComplianceDimRepository = module.get<UnitComplianceDimRepository>(
      UnitComplianceDimRepository,
    );
    queryBuilder = module.get<SelectQueryBuilder<UnitComplianceDim>>(
      SelectQueryBuilder,
    );

    unitComplianceDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockEmissionsCompliance');
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
  });

  describe('getEmissionsCompliance', () => {
    it('calls createQueryBuilder and gets all UnitComplianceDim results from the repository', async () => {
      const emptyFilters: EmissionsComplianceParamsDTO = new EmissionsComplianceParamsDTO();

      let result = await unitComplianceDimRepository.getEmissionsCompliance(
        emptyFilters,
      );

      result = await unitComplianceDimRepository.getEmissionsCompliance(
        filters,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockEmissionsCompliance');
    });

    it('calls createQueryBuilder and gets page 1 of UnitComplianceDim paginated results from the repository', async () => {
      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;
      let req: any = mockRequest(
        `/emissions-compliance?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      let paginatedResult = await unitComplianceDimRepository.getEmissionsCompliance(
        paginatedFilters,
        req,
      );
      expect(req.res.setHeader).toHaveBeenCalled();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockEmissionsCompliance');
    });
  });
  it('calls createQueryBuilder and gets page 2 of UnitComplianceDim paginated results from the repository', async () => {
    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;
    let req: any = mockRequest(
      `/emissions-compliance?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
    );
    req.res.setHeader.mockReturnValue();
    let paginatedResult = await unitComplianceDimRepository.getEmissionsCompliance(
      paginatedFilters,
      req,
    );
    expect(req.res.setHeader).toHaveBeenCalled();
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockEmissionsCompliance');
  });
});
