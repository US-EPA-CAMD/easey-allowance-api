import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { PaginationDTO } from './pagination.dto';
import { ActiveAllowanceProgram } from '../enum/active-allowance-program.enum';
import { State } from '../enum/state.enum';
import { AccountType } from '../enum/account-type.enum';
import { IsProgram } from 'src/pipes/is-program.pipe';
import { IsOrisCode } from 'src/pipes/is-oris-code.pipe';
import { IsStateCode } from 'src/pipes/is-state-code.pipe';
import { IsAccountType } from 'src/pipes/is-account-type.pipe';
import { IsAccountNumber } from 'src/pipes/is-account-number.pipe';
import { IsInDateRange } from 'src/pipes/is-in-date-range.pipe';

export class AllowanceHoldingsParamsDTO extends PaginationDTO {
  @IsOptional()
  @IsAccountType()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  accountType: AccountType[];

  @IsOptional()
  @IsAccountNumber()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  accountNumber: string[];

  @IsOptional()
  @IsOrisCode()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  orisCode: number[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator: string[];

  @IsOptional()
  @IsStateCode()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  state: State[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  vintageYear?: number[];

  @IsOptional()
  @IsProgram([
    'CAIRNOX',
    'CAIROS',
    'CAIRSO2',
    'CSNOXOS',
    'MATS',
    'NBP',
    'NHNOX',
    'NSPS4T',
    'OTC',
    'RGGI',
    'SIPNOX',
  ], {each:true, message: ''})
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  program: ActiveAllowanceProgram[];
}
