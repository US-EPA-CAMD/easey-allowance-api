import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import { IsYearGreater, IsYearFormat } from '@us-epa-camd/easey-common/pipes';
import { ActiveAllowanceProgram } from '@us-epa-camd/easey-common/enums';

import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { AllowanceParamsDTO } from './allowance.params.dto';
import { Page, PerPage } from '../utils/validator.const';

export class AllowanceHoldingsParamsDTO extends AllowanceParamsDTO {
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

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.ownerOperatorInfo.description,
  })
  @IsOptional()
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  @IsArray()
  ownerOperator?: string[];

  @ApiProperty({
    enum: ActiveAllowanceProgram,
    description: propertyMetadata.programCodeInfo.description,
  })
  @IsOptional()
  @IsAllowanceProgram(false, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'program-code') +
      '?allowanceUIFilter=true&isActive=true',
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  programCodeInfo?: ActiveAllowanceProgram[];
}

export class PaginatedAllowanceHoldingsParamsDTO extends AllowanceHoldingsParamsDTO {
  @Page()
  @ApiProperty({
    description: propertyMetadata.page.description,
  })
  page: number;

  @PerPage()
  @ApiProperty({
    description: propertyMetadata.perPage.description,
  })
  perPage: number;
}
