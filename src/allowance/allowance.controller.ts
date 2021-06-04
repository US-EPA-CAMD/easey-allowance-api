import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { AllowanceService } from './allowance.service';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';

@ApiTags('Allowances')
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
  @ApiQuery({ style: 'pipeDelimited', name: 'accountType', required: false, explode: false })
  @ApiQuery({ style: 'pipeDelimited', name: 'vintageYear', required: false, explode: false })
  @ApiQuery({ style: 'pipeDelimited', name: 'accountNumber', required: false, explode: false })
  @ApiQuery({ style: 'pipeDelimited', name: 'orisCode', required: false, explode: false })
  @ApiQuery({ style: 'pipeDelimited', name: 'ownerOperator', required: false, explode: false })
  @ApiQuery({ style: 'pipeDelimited', name: 'state', required: false, explode: false })
  @ApiQuery({ style: 'pipeDelimited', name: 'program', required: false, explode: false })
  getAllowanceHoldings(
    @Query() allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
    @Req() req: Request,
  ): Promise<AllowanceHoldingsDTO[]> {
    return this.allowanceService.getAllowanceHoldings(
      allowanceHoldingsParamsDTO,
      req,
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
