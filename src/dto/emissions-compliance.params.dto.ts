import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IsInDateRange } from '../pipes/is-in-date-range.pipe';
import { IsYearFormat } from '../pipes/is-year-format.pipe';
import { ErrorMessages } from '../utils/error-messages';

import { ComplianceParamsDTO } from './compliance.params.dto';

export class EmissionsComplianceParamsDTO extends ComplianceParamsDTO {
  @IsOptional()
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('year', 'YYYY'),
  })
  @IsInDateRange([new Date('1996-01-01'), new Date()], {
    each: true,
    message: ErrorMessages.DateRange(
      'year',
      true,
      'a year between 1996 and this year',
    ),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  year?: number[];
}
