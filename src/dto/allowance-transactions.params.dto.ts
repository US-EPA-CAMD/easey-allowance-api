import { Transform } from 'class-transformer';
import { IsArray, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import { IsYearGreater, IsYearFormat } from '@us-epa-camd/easey-common/pipes';
import {
  TransactionType,
  AllowanceProgram,
} from '@us-epa-camd/easey-common/enums';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { BeginDate, EndDate, Page, PerPage } from '../utils/validator.const';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { IsTransactionType } from '../pipes/is-transaction-type.pipe';

export class AllowanceTransactionsParamsDTO extends AllowanceParamsDTO {
  @ApiProperty({
    enum: AllowanceProgram,
    description: propertyMetadata.programCodeInfo.description,
  })
  @IsOptional()
  @IsAllowanceProgram(false, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'program-code') +
      '?allowanceUIFilter=true',
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  programCodeInfo?: AllowanceProgram[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.ownerOperatorInfo.description,
  })
  @IsOptional()
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  @IsArray()
  ownerOperator?: string[];

  @ApiProperty({
    description: propertyMetadata.transactionBeginDate.description,
  })
  @BeginDate()
  @IsDateString()
  transactionBeginDate: Date;

  @ApiProperty({
    description: propertyMetadata.transactionEndDate.description,
  })
  @EndDate()
  @IsDateString()
  transactionEndDate: Date;

  @ApiProperty({
    enum: TransactionType,
    description: propertyMetadata.transactionType.description,
  })
  @IsOptional()
  @IsTransactionType({
    each: true,
    message: ErrorMessages.AccountCharacteristics(
      true,
      'transaction-type-code',
    ),
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
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
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  @IsArray()
  vintageYear?: number[];
}

export class PaginatedAllowanceTransactionsParamsDTO extends AllowanceTransactionsParamsDTO {
  @ApiProperty({
    description: propertyMetadata.page.description,
  })
  @Page()
  page: number;

  @ApiProperty({
    description: propertyMetadata.perPage.description,
  })
  @PerPage()
  perPage: number;
}
