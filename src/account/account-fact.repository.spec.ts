import { Test } from '@nestjs/testing';
import { SelectQueryBuilder } from 'typeorm';

import { AccountDTO } from '../dto/account.dto';
import { AccountFactRepository } from './account-fact.repository';
import { AccountFact } from '../entities/account-fact.entity';

const mockQueryBuilder = () => ({
  select: jest.fn(),
  distinctOn: jest.fn(),
  orderBy: jest.fn(),
  getMany: jest.fn(),
});

describe('AccountFactRepository', () => {
  let accountFactRepository;
  let queryBuilder;
  const accountDTO = new AccountDTO();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountFactRepository,
        { provide: SelectQueryBuilder, useFactory: mockQueryBuilder },
      ],
    }).compile();

    accountFactRepository = module.get<AccountFactRepository>(
      AccountFactRepository,
    );

    queryBuilder = module.get<SelectQueryBuilder<AccountFact>>(
      SelectQueryBuilder,
    );

    accountFactRepository.createQueryBuilder = jest
      .fn()
      .mockReturnValue(queryBuilder);
    queryBuilder.select.mockReturnValue(queryBuilder);
    queryBuilder.distinctOn.mockReturnValue(queryBuilder);
    queryBuilder.orderBy.mockReturnValue(queryBuilder);
    queryBuilder.getMany.mockReturnValue(accountDTO);
  });

  describe('getAllAccounts', () => {
    it('calls createQueryBuilder and gets all accounts from the repository', async () => {
      let result = await accountFactRepository.getAllAccounts();
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual(accountDTO);
    });
  });
});
