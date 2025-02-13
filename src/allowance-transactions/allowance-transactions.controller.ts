import { Request } from 'express';
import { Get, Controller, Query, Req, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import { Json2CsvInterceptor } from '@us-epa-camd/easey-common/interceptors';

import { AllowanceTransactionsService } from './allowance-transactions.service';
import { AllowanceTransactionsDTO } from '../dto/allowance-transactions.dto';
import { PaginatedAllowanceTransactionsParamsDTO } from '../dto/allowance-transactions.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceTransactionsAttributesDTO } from '../dto/applicable-allowance-transactions-attributes.dto';
import { ApplicableAllowanceTransactionsAttributesParamsDTO } from '../dto/applicable-allowance-transactions-attributes.params.dto';
import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryMultiSelect,
} from '../utils/swagger-decorator.const';
import { fieldMappings } from '../constants/field-mappings';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Allowance Transactions')
@ApiExtraModels(AllowanceTransactionsDTO)
export class AllowanceTransactionsController {
  constructor(
    private readonly allowanceTransactionsService: AllowanceTransactionsService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves Allowance Transactions per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(AllowanceTransactionsDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
          example: fieldMappings.allowances.transactions.data
            .map(i => i.label)
            .join(','),
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
  @UseInterceptors(Json2CsvInterceptor)
  async getAllowanceTransactions(
    @Query()
    paginatedAllowanceTransactionsParamsDTO: PaginatedAllowanceTransactionsParamsDTO,
    @Req() req: Request,
  ): Promise<ArrayResponse<AllowanceTransactionsDTO>> {
    const transactionsDTOS =  await this.allowanceTransactionsService.getAllowanceTransactions(
      paginatedAllowanceTransactionsParamsDTO,
      req,
    );

    return  {
      items: transactionsDTOS
    };
  }

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableAllowanceTransactionsAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Allowance Transactions Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableAllowanceTransactionsAttributesDTO)
  async getAllApplicableAllowanceTransactionsAttributes(
    @Query()
    applicableAllowanceTransactionsAttributesParamsDTO: ApplicableAllowanceTransactionsAttributesParamsDTO,
  ): Promise<ArrayResponse<ApplicableAllowanceTransactionsAttributesDTO>> {
    const attributesDTOS =  await this.allowanceTransactionsService.getAllApplicableAllowanceTransactionsAttributes(
      applicableAllowanceTransactionsAttributesParamsDTO,
    );

    return  {
      items: attributesDTOS
    };
  }

  @Get('owner-operators')
  @ApiOkResponse({
    description: 'Retrieved All Valid Owner Operators',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(OwnerOperatorsDTO)
  async getAllOwnerOperators(): Promise<ArrayResponse<OwnerOperatorsDTO>> {
    const ownerOperatorsDTOS =  await this.allowanceTransactionsService.getAllOwnerOperators();

    return  {
      items: ownerOperatorsDTOS
    };
  }
}
