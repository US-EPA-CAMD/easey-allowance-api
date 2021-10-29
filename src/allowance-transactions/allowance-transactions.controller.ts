import { Request } from 'express';
import { Get, Controller, Query, Req, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiQuery,
} from '@nestjs/swagger';
import { Json2CsvInterceptor } from '@us-epa-camd/easey-common/interceptors';

import { AllowanceTransactionsService } from './allowance-transactions.service';
import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';
import { AllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryMultiSelect,
} from '../utils/swagger-decorator.const';

@Controller()
@ApiTags('Allowance Transactions')
@UseInterceptors(Json2CsvInterceptor)
export class AllowanceTransactionsController {
  constructor(
    private readonly allowanceTransactionsService: AllowanceTransactionsService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieve Allowance Transactions per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(AllowanceTransactionsDTO),
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
  @ApiQuery({
    style: 'pipeDelimited',
    name: 'transactionType',
    required: false,
    explode: false,
  })
  @ApiQuery({
    style: 'pipeDelimited',
    name: 'vintageYear',
    required: false,
    explode: false,
  })
  @ApiExtraModels(AllowanceTransactionsDTO)
  getAllowanceTransactions(
    @Query() allowanceTransactionsParamsDTO: AllowanceTransactionsParamsDTO,
    @Req() req: Request,
  ): Promise<AllowanceTransactionsDTO[]> {
    return this.allowanceTransactionsService.getAllowanceTransactions(
      allowanceTransactionsParamsDTO,
      req,
    );
  }

  @Get('owner-operators')
  @ApiOkResponse({
    description: 'Retrieved All Valid Owner Operators',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(OwnerOperatorsDTO)
  getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    return this.allowanceTransactionsService.getAllOwnerOperators();
  }
}
