import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { IsYearFormat, IsInDateRange } from '@us-epa-camd/easey-common/pipes';
import { ErrorMessages } from '@us-epa-camd/easey-common/constants';

import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { ComplianceParamsDTO } from './compliance.params.dto';
import { Page, PerPage } from '../utils/validator.const';

export class AllowanceComplianceParamsDTO extends ComplianceParamsDTO {
  @ApiProperty({
    enum: AllowanceProgram,
    description: propertyMetadata.programCodeInfo.description,
  })
  @IsOptional()
  @IsAllowanceProgram(false, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'program-code') +
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
  @IsInDateRange(new Date('1995-01-01'), true, false, false, {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      'a year between 1995 and this year',
    ),
  })
  @IsArray()
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  year?: number[];
}

export class PaginatedAllowanceComplianceParamsDTO extends AllowanceComplianceParamsDTO {
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
