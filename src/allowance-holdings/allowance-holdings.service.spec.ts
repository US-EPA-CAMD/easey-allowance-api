import { Test } from '@nestjs/testing';

import { AllowanceHoldingsService } from './allowance-holdings.service';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { PaginatedAllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { ApplicableAllowanceHoldingsAttributesMap } from '../maps/applicable-allowance-holdings-attributes.map';

const mockAllowanceHoldingDimRepository = () => ({
  getAllowanceHoldings: jest.fn(),
  streamAllowanceHoldings: jest.fn(),
  getAllApplicableAllowanceHoldingsAttributes: jest.fn(),
});

const mockAllowanceHoldingsMap = () => ({
  many: jest.fn(),
});

const mockRequest = () => {
  return {
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Allowance Holdings Service --', () => {
  let allowanceHoldingsService;
  let allowanceHoldingDimRepository;
  let allowanceHoldingsMap;
  let applicableAllowanceHoldingsAttributesMap;
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
        {
          provide: ApplicableAllowanceHoldingsAttributesMap,
          useFactory: mockAllowanceHoldingsMap,
        },
      ],
    }).compile();

    allowanceHoldingsService = module.get(AllowanceHoldingsService);
    allowanceHoldingDimRepository = module.get(AllowanceHoldingDimRepository);
    allowanceHoldingsMap = module.get(AllowanceHoldingsMap);
    applicableAllowanceHoldingsAttributesMap = module.get(
      ApplicableAllowanceHoldingsAttributesMap,
    );
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

  describe('getAllApplicableAllowanceHoldingsAttributes', () => {
    it('calls AllowanceHoldingsRepository.getAllApplicableAllowanceHoldingsAttributes() and gets all applicable allowance holdings attributes from the repository', async () => {
      allowanceHoldingDimRepository.getAllApplicableAllowanceHoldingsAttributes.mockResolvedValue(
        'list of applicable allowance holdings',
      );

      applicableAllowanceHoldingsAttributesMap.many.mockReturnValue(
        'mapped DTOs',
      );

      const result = await allowanceHoldingsService.getAllApplicableAllowanceHoldingsAttributes();
      expect(applicableAllowanceHoldingsAttributesMap.many).toHaveBeenCalled();
      expect(result).toEqual('mapped DTOs');
    });
  });
});
