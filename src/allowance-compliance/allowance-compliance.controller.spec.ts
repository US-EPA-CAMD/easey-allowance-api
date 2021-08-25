import { Test } from '@nestjs/testing';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceController } from './allowance-compliance.controller';
import { AllowanceComplianceService } from './allowance-compliance.service';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { State } from '../enum/state.enum';
import { AllowanceProgram } from '../enum/allowance-programs.enum';

const mockRequest = (url: string) => {
  return {
    url,
    res: {
      setHeader: jest.fn(),
    },
  };
};

describe('-- Allowance Compliance Controller --', () => {
  let allowanceComplianceController: AllowanceComplianceController;
  let allowanceComplianceService: AllowanceComplianceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AllowanceComplianceController],
      providers: [
        AllowanceComplianceService,
        AllowanceComplianceMap,
        AccountComplianceDimRepository,
      ],
    }).compile();

    allowanceComplianceController = module.get(AllowanceComplianceController);
    allowanceComplianceService = module.get(AllowanceComplianceService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('* getAllowanceCompliance', () => {
    const req: any = mockRequest('');
    req.res.setHeader.mockReturnValue();

    it('should call the service and return allowance compliance data ', async () => {
      const expectedResults: AllowanceComplianceDTO[] = [];
      const paramsDTO: AllowanceComplianceParamsDTO = {
        year: [2019],
        page: undefined,
        perPage: undefined,
        orisCode: [0],
        ownerOperator: [''],
        state: [State.AK],
        program: [AllowanceProgram.OTC],
      };
      jest
        .spyOn(allowanceComplianceService, 'getAllowanceCompliance')
        .mockResolvedValue(expectedResults);
      expect(
        await allowanceComplianceController.getAllowanceCompliance(
          paramsDTO,
          req,
        ),
      ).toBe(expectedResults);
    });
  });
});
