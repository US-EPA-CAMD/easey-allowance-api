import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AllowanceService } from './allowance.service';

@ApiTags('Allowance')
@Controller()
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Get('/holdings')
  @ApiOkResponse({
    description: 'Retrieved All Allowance Holdings',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource Not Found',
  })
  getAllowanceHoldings(): string {
    return this.allowanceService.getAllowanceHoldings();
  }

  @Get('/transactions')
  @ApiOkResponse({
    description: 'Retrieved All Allowance Transactions',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource Not Found',
  })
  getAllowanceTransactions(): string {
    return this.allowanceService.getAllowanceTransactions();
  }
}
