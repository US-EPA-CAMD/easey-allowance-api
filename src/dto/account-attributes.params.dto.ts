import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { ErrorMessages } from '../utils/error-messages';
import { AllowanceProgram } from '../enum/allowance-programs.enum';

export class AccountAttributesParamsDTO extends AllowanceParamsDTO {
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];

  @IsOptional()
  @IsAllowanceProgram(false, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'program') +
      '?allowanceUIFilter=true',
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program?: AllowanceProgram[];
}
