import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { OwnerYearDim } from '../entities/owner-year-dim.entity';

const mockQueryBuilder = () => ({
  select: jest.fn(),
  distinctOn: jest.fn(),
  orderBy: jest.fn(),
  getMany: jest.fn(),
});

describe('OwnerYearDimRepository', () => {
  let ownerYearDimRepository;
  let queryBuilder;
  const ownerOperatorsDTO = new OwnerOperatorsDTO();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OwnerYearDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    ownerYearDimRepository = module.get<OwnerYearDimRepository>(
      OwnerYearDimRepository,
    );

    queryBuilder = module.get<SelectQueryBuilder<OwnerYearDim>>(
      SelectQueryBuilder,
    );

    ownerYearDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue(ownerOperatorsDTO);
  });

  describe('getAllOwnerOperators', () => {
    it('calls createQueryBuilder and gets all owner/operators from the repository', async () => {
      let result = await ownerYearDimRepository.getAllOwnerOperators();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(ownerOperatorsDTO);
    });
  });
});
