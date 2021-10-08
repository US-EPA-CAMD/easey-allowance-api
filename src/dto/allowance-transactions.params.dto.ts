import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-constants/lib';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { ErrorMessages } from '../utils/error-messages';
import { TransactionType } from '../enum/transaction-type.enum';
import { AllowanceProgram } from '../enum/allowance-programs.enum';
import { BeginDate, EndDate } from '../utils/validator.const';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { IsTransactionType } from '../pipes/is-transaction-type.pipe';
import { IsYearFormat } from '../pipes/is-year-format.pipe';
import { IsYearGreater } from '../pipes/is-year-greater.pipe';

export class AllowanceTransactionsParamsDTO extends AllowanceParamsDTO {
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
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  programCodeInfo?: AllowanceProgram[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.ownerOperatorInfo.description,
  })
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];

  @ApiProperty({
    description: propertyMetadata.transactionBeginDate.description,
  })
  @BeginDate()
  transactionBeginDate: Date;

  @ApiProperty({
    description: propertyMetadata.transactionEndDate.description,
  })
  @EndDate()
  transactionEndDate: Date;

  @ApiProperty({
    enum: TransactionType,
    description: propertyMetadata.transactionType.description,
  })
  @IsOptional()
  @IsTransactionType({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'transactionType'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  transactionType?: TransactionType[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.vintageYear.description,
  })
  @IsOptional()
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('vintageYear', 'YYYY'),
  })
  @IsYearGreater(1995, {
    each: true,
    message: ErrorMessages.YearRange('vintageYear', '1995'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  vintageYear?: number[];
}
