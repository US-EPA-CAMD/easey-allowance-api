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
import { StreamService } from '@us-epa-camd/easey-common/stream';
import { StreamableFile } from '@nestjs/common';

const mockAllowanceHoldingDimRepository = () => ({
  getAllowanceHoldings: jest.fn(),
  streamAllowanceHoldings: jest.fn(),
  getAllApplicableAllowanceHoldingsAttributes: jest.fn(),
  getStreamQuery: jest.fn(),
});

const mockStream = {
  pipe: jest.fn().mockReturnValue({
    pipe: jest.fn().mockReturnValue(Buffer.from('stream')),
  }),
};

const mockAllowanceHoldingsMap = () => ({
  many: jest.fn(),
});

jest.mock('uuid', () => {
  return { v4: jest.fn().mockReturnValue(0) };
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
    on: jest.fn(),
  };
};

let req: any;

describe('-- Allowance Holdings Service --', () => {
  let allowanceHoldingsService;
  let allowanceHoldingDimRepository;
  let allowanceHoldingsMap;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AllowanceHoldingsService,
        {
          provide: StreamService,
          useFactory: () => ({
            getStream: () => {
              return mockStream;
            },
          }),
        },
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
      allowanceHoldingDimRepository.getStreamQuery.mockResolvedValue('');

      let filters = new StreamAllowanceHoldingsParamsDTO();

      req.headers.accept = '';

      let result = await allowanceHoldingsService.streamAllowanceHoldings(
        req,
        filters,
      );

      expect(result).toEqual(
        new StreamableFile(Buffer.from('stream'), {
          type: req.headers.accept,
          disposition: `attachment; filename="allowance-holdings-${0}.json"`,
        }),
      );
    });
  });
});
