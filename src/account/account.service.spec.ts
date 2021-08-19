import { Test } from '@nestjs/testing';

import { AccountFactRepository } from './account-fact.repository';
import { AccountMap } from '../maps/account.map';
import { AccountFact } from '../entities/account-fact.entity';
import { AccountDTO } from '../dto/account.dto';
import { AccountService } from './account.service';
import { AccountOwnerDim } from '../entities/account-owner-dim.entity';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';

const mockAccountFactRepository = () => ({
  getAllAccounts: jest.fn(),
});

const mockAccountOwnerDimRepository = () => ({
  getAllOwnerOperators: jest.fn(),
});

describe('-- Account Service --', () => {
  let accountService;
  let accountFactRepository;
  let accountOwnerDimRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountFactRepository,
          useFactory: mockAccountFactRepository,
        },
        {
          provide: AccountOwnerDimRepository,
          useFactory: mockAccountOwnerDimRepository
        },
        AccountMap,
        OwnerOperatorsMap,
      ],
    }).compile();

    accountService = module.get(AccountService);
    accountFactRepository = module.get(AccountFactRepository);
    accountOwnerDimRepository = module.get(AccountOwnerDimRepository)
  });

  describe('getAllAccounts', () => {
    it('repository.getAllAccounts() and returns all valid accounts', async () => {
      let accountFactEntity: AccountFact = new AccountFact();
      accountFactEntity.accountNumber = '';
      accountFactEntity.accountName = '';

      const accoutNumberDTO: AccountDTO = {
        accountNumber: '',
        accountName: '',
      };

      accountFactRepository.getAllAccounts.mockResolvedValue([
        accountFactEntity,
      ]);

      let result = await accountService.getAllAccounts();

      expect(accountFactRepository.getAllAccounts).toHaveBeenCalled();
      expect(result).toEqual([accoutNumberDTO]);
    });
  });

  describe('getAllOwnerOperators', () => {
    it('repository.getAllOwnerOperators() and returns all valid owner/operators', async () => {
      let accountOwnerDimEntity: AccountOwnerDim = new AccountOwnerDim();
      accountOwnerDimEntity.ownId = 0;
      accountOwnerDimEntity.ownerOperator = '';
      accountOwnerDimEntity.ownType = '';

      const ownerOperatorsDTO: OwnerOperatorsDTO = {
        ownId: 0,
        ownerOperator: '',
        ownType: '',
      };

      accountOwnerDimRepository.getAllOwnerOperators.mockResolvedValue([
        accountOwnerDimEntity,
      ]);

      let result = await accountService.getAllOwnerOperators();

      expect(accountOwnerDimRepository.getAllOwnerOperators).toHaveBeenCalled();
      expect(result).toEqual([ownerOperatorsDTO]);
    });
  });
});
