import { Request } from 'express';
import { Get, Controller, Query, Req, UseInterceptors } from '@nestjs/common';
import { Json2CsvInterceptor } from '../interceptors/json2csv.interceptor';
import {
  ApiTags,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryMultiSelect,
} from '../utils/swagger-decorator.const';

import { AllowanceService } from './allowance.service';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';

@Controller()
@ApiTags('Allowances')
@UseInterceptors(Json2CsvInterceptor)
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Get('/holdings')
  @ApiOkResponse({
    description: 'Retrieve Allowance Holdings per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(AllowanceHoldingsDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQueryMultiSelect()
  @ApiExtraModels(AllowanceHoldingsDTO)
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
    description: 'Retrieve Allowance Transactions per filter criteria',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  getAllowanceTransactions(): string {
    return this.allowanceService.getAllowanceTransactions();
  }
}
