import { Request } from 'express';
import { Get, Controller, UseInterceptors, Query, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiSecurity,
} from '@nestjs/swagger';
import { Json2CsvInterceptor } from '@us-epa-camd/easey-common/interceptors';

import {
  ApiQueryComplianceMultiSelect,
  BadRequestResponse,
  NotFoundResponse,
} from '../utils/swagger-decorator.const';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';
import { PaginatedEmissionsComplianceParamsDTO } from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceService } from './emissions-compliance.service';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';
import { fieldMappings } from '../constants/field-mappings';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Emissions Compliance')
@ApiExtraModels(EmissionsComplianceDTO)
export class EmissionsComplianceController {
  constructor(
    private readonly allowanceComplianceService: AllowanceComplianceService,
    private readonly emissionsComplianceService: EmissionsComplianceService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves Emissions Compliance Data per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(EmissionsComplianceDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
          example: fieldMappings.compliance.emissions.data
            .map(i => i.label)
            .join(','),
        },
      },
    },
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQueryComplianceMultiSelect()
  @UseInterceptors(Json2CsvInterceptor)
  async getEmissionsCompliance(
    @Query()
    paginatedEmissionsComplianceParamsDTO: PaginatedEmissionsComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<ArrayResponse<EmissionsComplianceDTO>> {
    const complianceDTOS =  await this.emissionsComplianceService.getEmissionsCompliance(
      paginatedEmissionsComplianceParamsDTO,
      req,
    );

    return  {
      items: complianceDTOS
    };
  }

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableComplianceAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Emissions Compliance Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableComplianceAttributesDTO)
  async getAllApplicableEmissionsComplianceAttributes(): Promise<ArrayResponse<ApplicableComplianceAttributesDTO>> {
    const attributesDTOS =  await this.emissionsComplianceService.getAllApplicableEmissionsComplianceAttributes();

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
    const ownerOperatorsDTOS =  await this.allowanceComplianceService.getAllOwnerOperators();

    return  {
      items: ownerOperatorsDTOS
    };
  }
}
