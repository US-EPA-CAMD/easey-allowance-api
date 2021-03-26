import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';

const mockQueryBuilder = () => ({
  andWhere: jest.fn(),
  getMany: jest.fn(),
  select: jest.fn(),
  innerJoin: jest.fn(),
});

let filters: AllowanceHoldingsParamsDTO = {
  vintageBeginYear: 2019,
  vintageEndYear: 2019,
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
    queryBuilder.getMany.mockReturnValue('mockAllowanceHoldings');
  });

  describe('getAllowanceHoldings', () => {
    it('calls createQueryBuilder and gets all AllowanceHoldingDim values from the repository', async () => {
      let result = await allowanceHoldingDimRepository.getAllowanceHoldings(
        filters,
      );

      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual('mockAllowanceHoldings');
    });
  });
});
