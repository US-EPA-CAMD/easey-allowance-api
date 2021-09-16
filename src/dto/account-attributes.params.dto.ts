import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { ErrorMessages } from '../utils/error-messages';
import { ActiveAllowanceProgram } from '../enum/active-allowance-program.enum';

export class AccountAttributesParamsDTO extends AllowanceParamsDTO {
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];

  @IsOptional()
  @IsAllowanceProgram(true, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'program') +
      '?allowanceUIFilter=true&isActive=true',
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program?: ActiveAllowanceProgram[];
}
