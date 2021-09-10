import { Request } from 'express';
import { Get, Controller, UseInterceptors, Query, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';

import { Json2CsvInterceptor } from '../interceptors/json2csv.interceptor';
import {
  ApiQueryComplianceMultiSelect,
  BadRequestResponse,
  NotFoundResponse,
} from '../utils/swagger-decorator.const';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { EmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceService } from './emissions-compliance.service';

@Controller()
@ApiTags('Emissions Compliance')
@UseInterceptors(Json2CsvInterceptor)
export class EmissionsComplianceController {
  constructor(
    private readonly allowanceComplianceService: AllowanceComplianceService,
    private readonly emissionsComplianceService: EmissionsComplianceService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieve Emissions Compliance Data per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(EmissionsComplianceDTO),
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
  @ApiExtraModels(EmissionsComplianceDTO)
  getEmissionsCompliance(
    @Query() emissionsComplianceParamsDTO: EmissionsComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<EmissionsComplianceDTO[]> {
    return this.emissionsComplianceService.getEmissionsCompliance(
      emissionsComplianceParamsDTO,
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
