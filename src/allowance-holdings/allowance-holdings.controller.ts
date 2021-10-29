import { Request } from 'express';
import { Get, Controller, Query, Req, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiQuery,
} from '@nestjs/swagger';

import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryMultiSelect,
} from '../utils/swagger-decorator.const';
import { Json2CsvInterceptor } from '../interceptors/json2csv.interceptor';
import { AllowanceHoldingsService } from './allowance-holdings.service';
import { AccountService } from '../account/account.service';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { AllowanceHoldingsDTO } from '../dto/allowance-holdings.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';

@Controller()
@ApiTags('Allowance Holdings')
@UseInterceptors(Json2CsvInterceptor)
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

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableAllowanceHoldingsAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Allowance Holdings Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableAllowanceHoldingsAttributesDTO)
  getAllApplicableAllowanceHoldingsAttributes(): Promise<
    ApplicableAllowanceHoldingsAttributesDTO[]
  > {
    return this.allowanceService.getAllApplicableAllowanceHoldingsAttributes();
  }

  @Get('owner-operators')
  @ApiOkResponse({
    description: 'Retrieved All Valid Owner Operators',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(OwnerOperatorsDTO)
  getAllOwnerOperators(): Promise<OwnerOperatorsDTO[]> {
    return this.accountService.getAllOwnerOperators();
  }
}
