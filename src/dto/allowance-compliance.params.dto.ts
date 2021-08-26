import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { IsInDateRange } from '../pipes/is-in-date-range.pipe';
import { IsYearFormat } from '../pipes/is-year-format.pipe';
import { ErrorMessages } from '../utils/error-messages';
import { AllowanceProgram } from '../enum/allowance-programs.enum';
import { ComplianceParamsDTO } from './compliance.params.dto';

export class AllowanceComplianceParamsDTO extends ComplianceParamsDTO {
  @IsOptional()
  @IsAllowanceProgram(false, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'program') +
      '?allowanceUIFilter=true',
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program?: AllowanceProgram[];

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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  year?: number[];
}
