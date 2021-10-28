import { Test } from '@nestjs/testing';

import { AccountFactRepository } from './account-fact.repository';
import { AccountMap } from '../maps/account.map';
import { AccountFact } from '../entities/account-fact.entity';
import { AccountService } from './account.service';
import { AccountOwnerDim } from '../entities/account-owner-dim.entity';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';

const mockAccountFactRepository = () => ({
  getAllAccounts: jest.fn(),
  getAllAccountAttributes: jest.fn()
});

const mockAccountMap = () => ({
  many: jest.fn(),
});

const mockAccountOwnerDimRepository = () => ({
  getAllOwnerOperators: jest.fn(),
});

const mockRequest = () => {
  return {
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Account Service --', () => {
  let accountService;
  let accountFactRepository;
  let accountOwnerDimRepository;
  let accountMap;
  let req: any;

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
          useFactory: mockAccountOwnerDimRepository,
        },
        {
          provide: AccountMap,
          useFactory: mockAccountMap,
        },
        OwnerOperatorsMap,
      ],
    }).compile();

    accountService = module.get(AccountService);
    accountFactRepository = module.get(AccountFactRepository);
    accountOwnerDimRepository = module.get(AccountOwnerDimRepository);
    accountMap = module.get(AccountMap)
    req = mockRequest();
    req.res.setHeader.mockReturnValue();
  });

  describe('getAllAccounts', () => {
    it('repository.getAllAccounts() and returns all valid accounts', async () => {
      let accountFactEntity: AccountFact = new AccountFact();
      accountFactEntity.accountNumber = '';
      accountFactEntity.accountName = '';

      accountFactRepository.getAllAccounts.mockResolvedValue([
        accountFactEntity,
      ]);
      accountMap.many.mockReturnValue('mapped DTOs');

      let result = await accountService.getAllAccounts();

      expect(accountFactRepository.getAllAccounts).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });

  describe('getAllAccountAttributes', () => {
    it('calls AcountFactRepository.getAllAccountAttributes() and gets all allowance holdings from the repository', async () => {
      accountFactRepository.getAllAccountAttributes.mockResolvedValue(
        'list of account attributes',
      );
      accountMap.many.mockReturnValue('mapped DTOs');

      let filters = new AccountAttributesParamsDTO();

      let result = await accountService.getAllAccountAttributes(
        filters,
        req,
      );
      expect(accountMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });

  describe('getAllOwnerOperators', () => {
    it('repository.getAllOwnerOperators() and returns all valid owner/operators', async () => {
      let accountOwnerDimEntity: AccountOwnerDim = new AccountOwnerDim();
      accountOwnerDimEntity.ownId = 0;
      accountOwnerDimEntity.ownerOperator = '';
      accountOwnerDimEntity.ownType = '';

      const ownerOperatorsDTO: OwnerOperatorsDTO = {
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
