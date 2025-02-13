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

import { AllowanceComplianceService } from './allowance-compliance.service';
import {
  BadRequestResponse,
  NotFoundResponse,
  ApiQueryComplianceMultiSelect,
} from '../utils/swagger-decorator.const';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';
import { PaginatedAllowanceComplianceParamsDTO } from '../dto/allowance-compliance.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceComplianceAttributesDTO } from '../dto/applicable-allowance-compliance-attributes.dto';
import { fieldMappings } from '../constants/field-mappings';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Allowance Compliance')
@ApiExtraModels(AllowanceComplianceDTO)
export class AllowanceComplianceController {
  constructor(
    private readonly allowanceComplianceService: AllowanceComplianceService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves Allowance Compliance Data per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(AllowanceComplianceDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
          example: fieldMappings.compliance.allowanceNbpOtc.data
            .map(i => i.label)
            .join(','),
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
  @UseInterceptors(Json2CsvInterceptor)
  async getAllowanceCompliance(
    @Query()
    paginatedAllowanceComplianceParamsDTO: PaginatedAllowanceComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<ArrayResponse<AllowanceComplianceDTO>> {
    const allowanceComplianceDTOS =  await this.allowanceComplianceService.getAllowanceCompliance(
      paginatedAllowanceComplianceParamsDTO,
      req,
    );

    return  {
      items: allowanceComplianceDTOS
    };
  }

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableAllowanceComplianceAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Allowance Compliance Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableAllowanceComplianceAttributesDTO)
  async getAllApplicableAllowanceComplianceAttributes(): Promise<ArrayResponse<ApplicableAllowanceComplianceAttributesDTO>> {
    const applicableAllowanceComplianceAttributesDTOS =  await this.allowanceComplianceService.getAllApplicableAllowanceComplianceAttributes();

    return  {
      items: applicableAllowanceComplianceAttributesDTOS
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
