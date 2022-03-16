import { Test } from '@nestjs/testing';
import { StreamableFile } from '@nestjs/common';

import { AccountMap } from '../maps/account.map';
import { AccountFactRepository } from './account-fact.repository';
import { AccountDTO } from '../dto/account.dto';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountAttributesDTO } from '../dto/account-attributes.dto';
import {
  PaginatedAccountAttributesParamsDTO,
  StreamAccountAttributesParamsDTO,
} from '../dto/account-attributes.params.dto';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { ApplicableAccountAttributesDTO } from '../dto/applicable-account-attributes.dto';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Account Controller --', () => {
  let accountController;
  let accountService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
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

  describe('* streamAllAccountAttributes', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return all account attributes ', async () => {
      const expectedResults: StreamableFile = undefined;
      const paramsDTO = new StreamAccountAttributesParamsDTO();
      jest
        .spyOn(accountService, 'streamAllAccountAttributes')
        .mockResolvedValue(expectedResults);
      expect(
        await accountController.streamAllAccountAttributes(req, paramsDTO),
      ).toBe(expectedResults);
    });
  });

  describe('* getAllAccountAttributes', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return allowance attributes ', async () => {
      const expectedResults: AccountAttributesDTO[] = [];
      const paramsDTO = new PaginatedAccountAttributesParamsDTO();
      jest
        .spyOn(accountService, 'getAllAccountAttributes')
        .mockResolvedValue(expectedResults);
      expect(
        await accountController.getAllAccountAttributes(paramsDTO, req),
      ).toBe(expectedResults);
    });
  });

  describe('* getAllApplicableAccountAttributes', () => {
    it('should call the service and return applicable account attributes ', async () => {
      const expectedResults: ApplicableAccountAttributesDTO[] = [];
      jest
        .spyOn(accountService, 'getAllApplicableAccountAttributes')
        .mockResolvedValue(expectedResults);
      expect(await accountController.getAllApplicableAccountAttributes()).toBe(
        expectedResults,
      );
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
