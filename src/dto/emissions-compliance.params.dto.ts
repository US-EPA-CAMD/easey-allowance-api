import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import { IsYearFormat } from '@us-epa-camd/easey-common/pipes';

import { IsInDateRange } from '../pipes/is-in-date-range.pipe';

import { ComplianceParamsDTO } from './compliance.params.dto';

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
  @IsInDateRange([new Date('1996-01-01'), 'currentDate'], {
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
