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

import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryMultiSelect,
} from '../utils/swagger-decorator.const';
import { AllowanceHoldingsService } from './allowance-holdings.service';
import { AccountService } from '../account/account.service';
import { PaginatedAllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';
import { fieldMappings } from '../constants/field-mappings';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Allowance Holdings')
@ApiExtraModels(AllowanceHoldingsDTO)
export class AllowanceHoldingsController {
  constructor(
    private readonly allowanceService: AllowanceHoldingsService,
    private readonly accountService: AccountService,
  ) {}

  @Get()
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
          example: fieldMappings.allowances.holdings.data
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
    name: 'vintageYear',
    required: false,
    explode: false,
  })
  @UseInterceptors(Json2CsvInterceptor)
  async getAllowanceHoldings(
    @Query()
    paginatedAllowanceHoldingsParamsDTO: PaginatedAllowanceHoldingsParamsDTO,
    @Req() req: Request,
  ): Promise<ArrayResponse<AllowanceHoldingsDTO>> {
    const holdingsDTOs =  await this.allowanceService.getAllowanceHoldings(
      paginatedAllowanceHoldingsParamsDTO,
      req,
    );

    return  {
      items: holdingsDTOs
    };
  }

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableAllowanceHoldingsAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Allowance Holdings Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableAllowanceHoldingsAttributesDTO)
  async getAllApplicableAllowanceHoldingsAttributes(): Promise<ArrayResponse<ApplicableAllowanceHoldingsAttributesDTO>> {
    const attributesDTOs =  await this.allowanceService.getAllApplicableAllowanceHoldingsAttributes();

    return  {
      items: attributesDTOs
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
    const operatorsDTOs =  await this.accountService.getAllOwnerOperators();

    return  {
      items: operatorsDTOs
    };
  }
}
