import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { EntityManager } from 'typeorm';

import { AccountFactRepository } from '../account/account-fact.repository';
import { AccountOwnerDimRepository } from '../account/account-owner-dim.repository';
import { AccountService } from '../account/account.service';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { PaginatedAllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { AccountMap } from '../maps/account.map';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsController } from './allowance-holdings.controller';
import { AllowanceHoldingsService } from './allowance-holdings.service';

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
      imports: [LoggerModule],
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
        EntityManager,
      ],
    }).compile();

    allowanceHoldingsController = module.get(AllowanceHoldingsController);
    allowanceHoldingsService = module.get(AllowanceHoldingsService);
    accountService = module.get(AccountService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllowanceHoldings', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return allowance holdings ', async () => {
      const expectedResults: AllowanceHoldingsDTO[] = [];
      const paramsDTO = new PaginatedAllowanceHoldingsParamsDTO();
      jest
        .spyOn(allowanceHoldingsService, 'getAllowanceHoldings')
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceHoldingsController.getAllowanceHoldings(paramsDTO, req),
      ).toStrictEqual( { items:expectedResults} );
    });
  });

  describe('* getAllOwnerOperators', () => {
    it('should call the service and return owner operators ', async () => {
      const expectedResults: OwnerOperatorsDTO[] = [];
      jest
        .spyOn(accountService, 'getAllOwnerOperators')
        .mockResolvedValue(expectedResults);
      expect(await allowanceHoldingsController.getAllOwnerOperators()).toStrictEqual( { items:expectedResults,});
    });
  });

  describe('* getAllApplicableAllowanceHoldingsAttributes', () => {
    it('should call the service and return applicable allowance holdings attributes', async () => {
      const expectedResults: ApplicableAllowanceHoldingsAttributesDTO[] = [];
      jest
        .spyOn(
          allowanceHoldingsService,
          'getAllApplicableAllowanceHoldingsAttributes',
        )
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceHoldingsController.getAllApplicableAllowanceHoldingsAttributes(),
      ).toStrictEqual( { items:expectedResults });
    });
  });
});
