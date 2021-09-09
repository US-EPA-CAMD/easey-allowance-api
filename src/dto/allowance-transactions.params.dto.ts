import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { ErrorMessages } from '../utils/error-messages';
import { TransactionType } from '../enum/transaction-type.enum';
import { AllowanceProgram } from '../enum/allowance-programs.enum';
import { BeginDate, EndDate } from '../utils/validator.const';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { IsTransactionType } from 'src/pipes/is-transaction-type.pipe';

export class AllowanceTransactionsParamsDTO extends AllowanceParamsDTO {
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];

  @BeginDate()
  transactionBeginDate: Date;

  @EndDate()
  transactionEndDate: Date;

  @IsOptional()
  @IsTransactionType({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'transactionType'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  transactionType?: TransactionType[];
}
