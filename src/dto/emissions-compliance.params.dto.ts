import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import {
  IsYearFormat,
  IsInDateRange,
  IsInEnum,
  IsInResponse,
} from '@us-epa-camd/easey-common/pipes';
import { ExcludeEmissionsCompliance } from '@us-epa-camd/easey-common/enums';

import { ComplianceParamsDTO } from './compliance.params.dto';
import { fieldMappings } from '../constants/field-mappings';
import { Page, PerPage } from '../utils/validator.const';

export class EmissionsComplianceParamsDTO extends ComplianceParamsDTO {
  @ApiHideProperty()
  currentDate: Date = this.getCurrentDate;

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.year.description,
  })
  @IsOptional()
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('year', 'YYYY'),
  })
  @IsInDateRange([new Date('1996-01-01'), 'currentDate'], true, false, false, {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      'a year between 1996 and this year',
    ),
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  year?: number[];

  private get getCurrentDate(): Date {
    return new Date();
  }
}

export class PaginatedEmissionsComplianceParamsDTO extends EmissionsComplianceParamsDTO {
  @ApiProperty({
    description: propertyMetadata.page.description,
  })
  @Page()
  page: number;

  @ApiProperty({
    description: propertyMetadata.perPage.description,
  })
  @PerPage()
  perPage: number;
}

export class StreamEmissionsComplianceParamsDTO extends EmissionsComplianceParamsDTO {
  @ApiProperty({
    enum: ExcludeEmissionsCompliance,
    description: propertyMetadata.exclude.description,
  })
  @IsOptional()
  @IsInEnum(ExcludeEmissionsCompliance, {
    each: true,
    message: ErrorMessages.RemovableParameter(),
  })
  @IsInResponse(fieldMappings.compliance.emissions.data, {
    each: true,
    message: ErrorMessages.ValidParameter(),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  exclude?: ExcludeEmissionsCompliance[];
}
