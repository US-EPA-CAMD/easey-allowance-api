import { Test } from '@nestjs/testing';

import { AllowanceHoldingsController } from './allowance-holdings.controller';
import { AllowanceHoldingsService } from './allowance-holdings.service';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AccountService } from '../account/account.service';
import { AccountOwnerDimRepository } from '../account/account-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountFactRepository } from '../account/account-fact.repository';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountMap } from '../maps/account.map';
import { ApplicableAccountAttributesMap } from '../maps/applicable-account-attributes.map';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Allowance Holdings Controller --', () => {
  let allowanceHoldingsController: AllowanceHoldingsController;
  let allowanceHoldingsService: AllowanceHoldingsService;
  let accountService: AccountService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AllowanceHoldingsController],
      providers: [
        AllowanceHoldingsService,
        AllowanceHoldingsMap,
        AllowanceHoldingDimRepository,
        AccountService,
        AccountOwnerDimRepository,
        OwnerOperatorsMap, 
        AccountFactRepository,
        AccountMap,
        ApplicableAccountAttributesMap
      ],
    }).compile();

    allowanceHoldingsController = module.get(AllowanceHoldingsController);
    allowanceHoldingsService = module.get(AllowanceHoldingsService);
    accountService = module.get(AccountService)
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllowanceHoldings', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return allowance holdings ', async () => {
      const expectedResults: AllowanceHoldingsDTO[] = [];
      const paramsDTO = new AllowanceHoldingsParamsDTO();
      jest
        .spyOn(allowanceHoldingsService, 'getAllowanceHoldings')
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceHoldingsController.getAllowanceHoldings(paramsDTO, req),
      ).toBe(expectedResults);
    });
  });

  describe('* getAllOwnerOperators', () => {
    it('should call the service and return owner operators ', async () => {
      const expectedResults: OwnerOperatorsDTO[] = [];
      jest
        .spyOn(accountService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await allowanceHoldingsController.getAllOwnerOperators()).toBe(
        expectedResults,
      );
    });
  });
});
