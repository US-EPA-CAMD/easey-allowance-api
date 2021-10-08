import { Request } from 'express';
import { Get, Controller, Query, Req, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiQuery,
} from '@nestjs/swagger';

import { Json2CsvInterceptor } from '../interceptors/json2csv.interceptor';
import { AllowanceComplianceService } from './allowance-compliance.service';
import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryComplianceMultiSelect,
} from '../utils/swagger-decorator.const';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { AllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

@Controller()
@ApiTags('Allowance Compliance')
@UseInterceptors(Json2CsvInterceptor)
export class AllowanceComplianceController {
  constructor(
    private readonly allowanceComplianceService: AllowanceComplianceService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieve Allowance Compliance Data per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(AllowanceComplianceDTO),
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
  @ApiQueryComplianceMultiSelect()
  @ApiQuery({
    style: 'pipeDelimited',
    name: 'programCodeInfo',
    required: false,
    explode: false,
  })
  @ApiExtraModels(AllowanceComplianceDTO)
  getAllowanceCompliance(
    @Query() allowanceComplianceParamsDTO: AllowanceComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<AllowanceComplianceDTO[]> {
    return this.allowanceComplianceService.getAllowanceCompliance(
      allowanceComplianceParamsDTO,
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
    return this.allowanceComplianceService.getAllOwnerOperators();
  }
}
