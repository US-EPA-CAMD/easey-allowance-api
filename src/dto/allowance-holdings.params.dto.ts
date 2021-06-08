import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { PaginationDTO } from './pagination.dto';
import { ActiveAllowanceProgram } from '../enum/active-allowance-program.enum';
import { State } from '../enum/state.enum';
import { AccountType } from '../enum/account-type.enum';
import { IsOrisCode } from '../pipes/is-oris-code.pipe';
import { IsStateCode } from '../pipes/is-state-code.pipe';
import { IsAccountType } from '../pipes/is-account-type.pipe';
import { IsAccountNumber } from '../pipes/is-account-number.pipe';
import { IsYearGreater } from '../pipes/is-year-greater.pipe';
import { IsActiveAllowanceProgram } from '../pipes/is-active-allowance-program.pipe';
import { ErrorMessages } from '../utils/error-messages';
import { IsYearFormat } from '../pipes/is-year-format.pipe';

export class AllowanceHoldingsParamsDTO extends PaginationDTO {
  @IsOptional()
  @IsAccountType({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'accountType'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  accountType: AccountType[];

  @IsOptional()
  @IsAccountNumber({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'accountNumber'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  accountNumber: string[];

  @IsOptional()
  @IsOrisCode({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'orisCode'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  orisCode: number[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator: string[];

  @IsOptional()
  @IsStateCode({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'state'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  state: State[];

  @IsOptional()
  @IsYearFormat({
    each: true,
    message: ErrorMessages.DateFormat('vintageYear', 'YYYY'),
  })
  @IsYearGreater(1995, {
    each: true,
    message: ErrorMessages.YearRange('vintageYear', '1995'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  vintageYear?: number[];

  @IsOptional()
  @IsActiveAllowanceProgram({
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'program') +
      '?allowanceOnly=true&isActive=true',
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program: ActiveAllowanceProgram[];
}
