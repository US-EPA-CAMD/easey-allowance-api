import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { State } from '../enum/state.enum';
import { AllowanceProgram } from '../enum/allowance-programs.enum';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';

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

let filters: AllowanceComplianceParamsDTO = {
  year: [2019, 2020],
  page: undefined,
  perPage: undefined,
  orisCode: [0],
  ownerOperator: [''],
  state: [State.AK],
  program: [AllowanceProgram.ARP],
};

describe('-- AccountComplianceDimRepository --', () => {
  let accountComplianceDimRepository;
  let queryBuilder;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountComplianceDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    accountComplianceDimRepository = module.get<AccountComplianceDimRepository>(
      AccountComplianceDimRepository,
    );
    queryBuilder = module.get<SelectQueryBuilder<AccountComplianceDim>>(
      SelectQueryBuilder,
    );

    accountComplianceDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.innerJoin.mockReturnValue(queryBuilder);
    queryBuilder.andWhere.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.addOrderBy.mockReturnValue(queryBuilder);
    queryBuilder.skip.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue('mockAllowanceCompliance');
    queryBuilder.take.mockReturnValue('mockPagination');
    queryBuilder.getCount.mockReturnValue('mockCount');
  });

  describe('getAllowanceCompliance', () => {
    it('calls createQueryBuilder and gets all AccountComplianceDim results from the repository', async () => {
      const emptyFilters: AllowanceComplianceParamsDTO = new AllowanceComplianceParamsDTO();

      let result = await accountComplianceDimRepository.getAllowanceCompliance(
        emptyFilters,
      );

      result = await accountComplianceDimRepository.getAllowanceCompliance(
        filters,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceCompliance');
    });

    it('calls createQueryBuilder and gets page 1 of AccountComplianceDim paginated results from the repository', async () => {
      let paginatedFilters = filters;
      paginatedFilters.page = 1;
      paginatedFilters.perPage = 5;
      let req: any = mockRequest(
        `/allowance-compliance?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
      );
      req.res.setHeader.mockReturnValue();
      let paginatedResult = await accountComplianceDimRepository.getAllowanceCompliance(
        paginatedFilters,
        req,
      );
      expect(req.res.setHeader).toHaveBeenCalled();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(paginatedResult).toEqual('mockAllowanceCompliance');
    });
  });
  it('calls createQueryBuilder and gets page 2 of AccountComplianceDim paginated results from the repository', async () => {
    let paginatedFilters = filters;
    paginatedFilters.page = 2;
    paginatedFilters.perPage = 5;
    let req: any = mockRequest(
      `/allowance-compliance?page=${paginatedFilters.page}&perPage=${paginatedFilters.perPage}`,
    );
    req.res.setHeader.mockReturnValue();
    let paginatedResult = await accountComplianceDimRepository.getAllowanceCompliance(
      paginatedFilters,
      req,
    );
    expect(req.res.setHeader).toHaveBeenCalled();
    expect(queryBuilder.getMany).toHaveBeenCalled();
    expect(paginatedResult).toEqual('mockAllowanceCompliance');
  });
});
