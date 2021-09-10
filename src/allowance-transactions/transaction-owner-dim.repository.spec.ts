import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';
import { TransactionOwnerDim } from '../entities/transaction-owner-dim.entity';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

const mockQueryBuilder = () => ({
  select: jest.fn(),
  distinctOn: jest.fn(),
  orderBy: jest.fn(),
  getMany: jest.fn(),
  where: jest.fn(),
});

describe('TransactionOwnerDimRepository', () => {
  let transactionOwnerDimRepository;
  let queryBuilder;
  const ownerOperatorsDTO = new OwnerOperatorsDTO();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TransactionOwnerDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    transactionOwnerDimRepository = module.get<TransactionOwnerDimRepository>(
      TransactionOwnerDimRepository,
    );

    queryBuilder = module.get<SelectQueryBuilder<TransactionOwnerDim>>(
      SelectQueryBuilder,
    );

    transactionOwnerDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue(ownerOperatorsDTO);
    queryBuilder.where.mockReturnValue(queryBuilder);
  });

  describe('getAllOwnerOperators', () => {
    it('calls createQueryBuilder and gets all owner/operators from the repository', async () => {
      let result = await transactionOwnerDimRepository.getAllOwnerOperators();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(ownerOperatorsDTO);
    });
  });
});
