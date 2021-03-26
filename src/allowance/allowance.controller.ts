import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AllowanceService } from './allowance.service';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';

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
  getAllowanceHoldings(
    @Query() allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
  ): Promise<AllowanceHoldingsDTO[]> {
    return this.allowanceService.getAllowanceHoldings(
      allowanceHoldingsParamsDTO,
    );
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
