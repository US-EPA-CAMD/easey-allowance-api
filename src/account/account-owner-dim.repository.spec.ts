import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountOwnerDim } from '../entities/account-owner-dim.entity';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

const mockQueryBuilder = () => ({
  select: jest.fn(),
  distinctOn: jest.fn(),
  orderBy: jest.fn(),
  getMany: jest.fn(),
});

describe('AccountOwnerDimRepository', () => {
  let accountOwnerDimRepository;
  let queryBuilder;
  const ownerOperatorsDTO = new OwnerOperatorsDTO();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountOwnerDimRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    accountOwnerDimRepository = module.get<AccountOwnerDimRepository>(
      AccountOwnerDimRepository,
    );

    queryBuilder = module.get<SelectQueryBuilder<AccountOwnerDim>>(
      SelectQueryBuilder,
    );

    accountOwnerDimRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue(ownerOperatorsDTO);
  });

  describe('getAllOwnerOperators', () => {
    it('calls createQueryBuilder and gets all owner/operators from the repository', async () => {
      let result = await accountOwnerDimRepository.getAllOwnerOperators();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(ownerOperatorsDTO);
    });
  });
});
