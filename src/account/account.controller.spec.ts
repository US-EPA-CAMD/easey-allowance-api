import { Test } from '@nestjs/testing';

import { AccountMap } from '../maps/account.map';
import { AccountFactRepository } from './account-fact.repository';
import { AccountDTO } from '../dto/account.dto';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('-- Account Controller --', () => {
  let accountController;
  let accountService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService, AccountMap, AccountFactRepository],
    }).compile();

    accountController = module.get(AccountController);
    accountService = module.get(AccountService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllAccounts', () => {
    it('should call the service and return a list of valid accounts', async () => {
      const expectedResult: AccountDTO[] = [];
      jest
        .spyOn(accountService, 'getAllAccounts')
        .mockResolvedValue(expectedResult);
      expect(await accountController.getAllAccounts()).toBe(
        expectedResult,
      );
    });
  });
});
