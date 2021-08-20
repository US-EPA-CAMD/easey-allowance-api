import { Test } from '@nestjs/testing';

import { AccountMap } from '../maps/account.map';
import { AccountFactRepository } from './account-fact.repository';
import { AccountDTO } from '../dto/account.dto';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';

describe('-- Account Controller --', () => {
  let accountController;
  let accountService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountService,
        AccountMap,
        AccountFactRepository,
        AccountOwnerDimRepository,
        OwnerOperatorsMap,
      ],
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
      expect(await accountController.getAllAccounts()).toBe(expectedResult);
    });
  });

  describe('* getAllOwnerOperators', () => {
    it('should call the service and return owner operators ', async () => {
      const expectedResults: OwnerOperatorsDTO[] = [];
      jest
        .spyOn(accountService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await accountController.getAllOwnerOperators()).toBe(
        expectedResults,
      );
    });
  });
});
