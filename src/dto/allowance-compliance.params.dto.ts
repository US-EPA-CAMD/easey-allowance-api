import { Transform } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import {
  AllowanceProgram,
  ExcludeAllowanceCompliance,
} from '@us-epa-camd/easey-common/enums';
import {
  IsYearFormat,
  IsInDateRange,
  Min,
  IsInRange,
  IsInEnum,
  IsInResponse,
} from '@us-epa-camd/easey-common/pipes';
import { ErrorMessages } from '@us-epa-camd/easey-common/constants';

import { PAGINATION_MAX_PER_PAGE } from '../config/app.config';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { ComplianceParamsDTO } from './compliance.params.dto';
import { fieldMappings } from '../constants/field-mappings';

export class AllowanceComplianceParamsDTO extends ComplianceParamsDTO {
  @ApiHideProperty()
  currentDate: Date = this.getCurrentDate;

  @ApiProperty({
    enum: AllowanceProgram,
    description: propertyMetadata.programCodeInfo.description,
  })
  @IsOptional()
  @IsAllowanceProgram(false, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'programCodeInfo') +
      '?allowanceUIFilter=true',
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  programCodeInfo?: AllowanceProgram[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.year.description,
  })
  @IsOptional()
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('year', 'YYYY'),
  })
  @IsInDateRange([new Date('1995-01-01'), 'currentDate'], true, false, false, {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      'a year between 1995 and this year',
    ),
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  year?: number[];

  private get getCurrentDate(): Date {
    return new Date();
  }
}

export class PaginatedAllowanceComplianceParamsDTO extends AllowanceComplianceParamsDTO {
  @ApiProperty({
    description: propertyMetadata.page.description,
  })
  @IsDefined()
  @Min(1, {
    message: ErrorMessages.GreaterThanOrEqual('page', 1),
  })
  page: number;

  @ApiProperty({
    description: propertyMetadata.perPage.description,
  })
  @IsDefined()
  @IsInRange(1, PAGINATION_MAX_PER_PAGE, {
    message: ErrorMessages.Between('perPage', 1, PAGINATION_MAX_PER_PAGE),
  })
  perPage: number;
}

export class StreamAllowanceComplianceParamsDTO extends AllowanceComplianceParamsDTO {
  @ApiProperty({
    enum: ExcludeAllowanceCompliance,
    description: propertyMetadata.exclude.description,
  })
  @IsOptional()
  @IsInEnum(ExcludeAllowanceCompliance, {
    each: true,
    message: ErrorMessages.RemovableParameter(),
  })
  @IsInResponse(fieldMappings.compliance.allowanceNbpOtc, {
    each: true,
    message: ErrorMessages.ValidParameter(),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  exclude?: ExcludeAllowanceCompliance[];
}
