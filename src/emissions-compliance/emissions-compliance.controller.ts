import { Request } from 'express';
import {
  Get,
  Controller,
  UseInterceptors,
  Query,
  Req,
  StreamableFile,
} from '@nestjs/common';
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
import {
  EmissionsComplianceParamsDTO,
  PaginatedEmissionsComplianceParamsDTO,
} from '../dto/emissions-compliance.params.dto';
import { EmissionsComplianceService } from './emissions-compliance.service';
import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';
import { fieldMappings } from '../constants/field-mappings';

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
          example: fieldMappings.compliance.emissions
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
  getEmissionsCompliance(
    @Query()
    paginatedEmissionsComplianceParamsDTO: PaginatedEmissionsComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<EmissionsComplianceDTO[]> {
    return this.emissionsComplianceService.getEmissionsCompliance(
      paginatedEmissionsComplianceParamsDTO,
      req,
    );
  }

  @Get('stream')
  @ApiOkResponse({
    description: 'Streams Allowance Emissions Data per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(EmissionsComplianceDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
          example: fieldMappings.compliance.emissions
            .map(i => i.label)
            .join(','),
        },
      },
    },
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQueryComplianceMultiSelect()
  streamEmissionsCompliance(
    @Query() emissionsComplianceParamsDTO: EmissionsComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<StreamableFile> {
    return this.emissionsComplianceService.streamEmissionsCompliance(
      emissionsComplianceParamsDTO,
      req,
    );
  }

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableComplianceAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Emissions Compliance Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableComplianceAttributesDTO)
  getAllApplicableEmissionsComplianceAttributes(): Promise<
    ApplicableComplianceAttributesDTO[]
  > {
    return this.emissionsComplianceService.getAllApplicableEmissionsComplianceAttributes();
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
