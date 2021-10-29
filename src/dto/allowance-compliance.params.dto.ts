import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { IsYearFormat } from '@us-epa-camd/easey-common/pipes';
import { ErrorMessages } from '@us-epa-camd/easey-common/constants';

import { IsInDateRange } from '../pipes/is-in-date-range.pipe';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { ComplianceParamsDTO } from './compliance.params.dto';

export class AllowanceComplianceParamsDTO extends ComplianceParamsDTO {
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
  @IsInDateRange([new Date('1995-01-01'), new Date()], {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      'a year between 1995 and this year',
    ),
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  year?: number[];
}
