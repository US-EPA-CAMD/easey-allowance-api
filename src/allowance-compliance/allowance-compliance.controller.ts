import { Request } from 'express';
import {
  Get,
  Controller,
  Query,
  Req,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
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
import {
  AllowanceComplianceParamsDTO,
  PaginatedAllowanceComplianceParamsDTO,
} from '../dto/allowance-compliance.params.dto';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';
import { ApplicableAllowanceComplianceAttributesDTO } from '../dto/applicable-allowance-compliance-attributes.dto';
import { fieldMappings } from '../constants/field-mappings';

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
          example: fieldMappings.compliance.allowanceNbpOtc
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
  getAllowanceCompliance(
    @Query()
    paginatedAllowanceComplianceParamsDTO: PaginatedAllowanceComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<AllowanceComplianceDTO[]> {
    return this.allowanceComplianceService.getAllowanceCompliance(
      paginatedAllowanceComplianceParamsDTO,
      req,
    );
  }

  @Get('stream')
  @ApiOkResponse({
    description: 'Streams Allowance Compliance Data per filter criteria',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(AllowanceComplianceDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
          example: fieldMappings.compliance.allowanceNbpOtc
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
  streamAllowanceCompliance(
    @Query() allowanceComplianceParamsDTO: AllowanceComplianceParamsDTO,
    @Req() req: Request,
  ): Promise<StreamableFile> {
    return this.allowanceComplianceService.streamAllowanceCompliance(
      allowanceComplianceParamsDTO,
      req,
    );
  }

  @Get('attributes/applicable')
  @ApiExtraModels(ApplicableAllowanceComplianceAttributesDTO)
  @ApiOkResponse({
    description: 'Retrieved All Applicable Allowance Compliance Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(ApplicableAllowanceComplianceAttributesDTO)
  getAllApplicableAllowanceComplianceAttributes(): Promise<
    ApplicableAllowanceComplianceAttributesDTO[]
  > {
    return this.allowanceComplianceService.getAllApplicableAllowanceComplianceAttributes();
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
