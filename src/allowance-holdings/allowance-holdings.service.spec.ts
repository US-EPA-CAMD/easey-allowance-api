import { Test } from '@nestjs/testing';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';

import { AllowanceHoldingsService } from './allowance-holdings.service';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import {
  PaginatedAllowanceHoldingsParamsDTO,
  StreamAllowanceHoldingsParamsDTO,
} from '../dto/allowance-holdings.params.dto';
import {
  AccountType,
  ActiveAllowanceProgram,
  ExcludeAllowanceHoldings,
  State,
} from '@us-epa-camd/easey-common/enums';

const mockAllowanceHoldingDimRepository = () => ({
  getAllowanceHoldings: jest.fn(),
  streamAllowanceHoldings: jest.fn(),
  getAllApplicableAllowanceHoldingsAttributes: jest.fn(),
});

const mockAllowanceHoldingsMap = () => ({
  many: jest.fn(),
});

const mockRequest = (url?: string, page?: number, perPage?: number) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
    query: {
      page,
      perPage,
    },
    headers: {
      accept: 'text/csv',
    },
  };
};
describe('-- Allowance Holdings Service --', () => {
  let allowanceHoldingsService;
  let allowanceHoldingDimRepository;
  let allowanceHoldingsMap;
  let req: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AllowanceHoldingsService,
        {
          provide: AllowanceHoldingDimRepository,
          useFactory: mockAllowanceHoldingDimRepository,
        },
        { provide: AllowanceHoldingsMap, useFactory: mockAllowanceHoldingsMap },
      ],
    }).compile();

    allowanceHoldingsService = module.get(AllowanceHoldingsService);
    allowanceHoldingDimRepository = module.get(AllowanceHoldingDimRepository);
    allowanceHoldingsMap = module.get(AllowanceHoldingsMap);

    req = mockRequest();
    req.res.setHeader.mockReturnValue();
  });

  describe('getAllowanceHoldings', () => {
    it('calls AllowanceHoldingDimRepository.getAllowanceHoldings() and gets all allowance holdings from the repository', async () => {
      allowanceHoldingDimRepository.getAllowanceHoldings.mockResolvedValue(
        'list of allowance holdings',
      );
      allowanceHoldingsMap.many.mockReturnValue('mapped DTOs');

      let filters = new PaginatedAllowanceHoldingsParamsDTO();

      let result = await allowanceHoldingsService.getAllowanceHoldings(
        filters,
        req,
      );
      expect(allowanceHoldingsMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });

  describe('streamAllowanceHoldings', () => {
    it('streams all allowance holdings', async () => {
      let streamFilters = new StreamAllowanceHoldingsParamsDTO();
      (streamFilters.accountType = [AccountType.GENERAL]),
        (streamFilters.vintageYear = [2019, 2020]),
        (streamFilters.accountNumber = ['000127FACLTY']),
        (streamFilters.facilityId = [0]),
        (streamFilters.ownerOperator = ['']),
        (streamFilters.stateCode = [State.AK]),
        (streamFilters.programCodeInfo = [ActiveAllowanceProgram.ARP]),
        (streamFilters.exclude = [ExcludeAllowanceHoldings.FACILITY_ID]);

      const mockResult: any = {
        pipe: toDto => {
          return {
            pipe: toCSV => {
              return {
                accountNumber: '000003FACLTY',
                accountName: 'Barry',
                facilityId: 3,
                programCodeInfo: 'ARP,CSNOX,CSSO2G2,MATS',
                vintageYear: 2016,
                totalBlock: 10033,
                startBlock: 266955,
                endBlock: 276987,
                stateCode: 'AK',
                epaRegion: 5,
                ownerOperator:
                  'Alabama Power Company (Operator), Alabama Power Company (Owner)',
                accountType: 'Facility Account',
              };
            },
          };
        },
      };
      const req: any = mockRequest(`/allowance-holdings/stream`);
      req.res.setHeader.mockReturnValue();
      allowanceHoldingDimRepository.streamAllowanceHoldings.mockResolvedValue(
        mockResult,
      );

      const result = await allowanceHoldingsService.streamAllowanceHoldings(
        req,
        streamFilters,
      );
    });
  });
});
