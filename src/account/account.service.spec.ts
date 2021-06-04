import { Test } from '@nestjs/testing';

import { AccountFactRepository } from './account-fact.repository';
import { AccountMap } from '../maps/account.map';
import { AccountFact } from '../entities/account-fact.entity';
import { AccountDTO } from '../dto/account.dto';
import { AccountService } from './account.service';

const mockAccountFactRepository = () => ({
  getAllAccounts: jest.fn(),
});

describe('-- Account Service --', () => {
  let accountService;
  let accountFactRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountFactRepository,
          useFactory: mockAccountFactRepository,
        },
        AccountMap,
      ],
    }).compile();

    accountService = module.get(AccountService);
    accountFactRepository = module.get(AccountFactRepository);
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
});
