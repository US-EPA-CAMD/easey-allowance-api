import { Transform } from 'class-transformer';
import { IsDefined, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import {
  IsInEnum,
  IsInRange,
  IsInResponse,
  IsYearFormat,
  Min,
} from '@us-epa-camd/easey-common/pipes';
import {
  ActiveAllowanceProgram,
  ExcludeAllowanceHoldings,
} from '@us-epa-camd/easey-common/enums';

import { IsYearGreater } from '../pipes/is-year-greater.pipe';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { AllowanceParamsDTO } from './allowance.params.dto';
import { PAGINATION_MAX_PER_PAGE } from '../config/app.config';
import { fieldMappings } from '../constants/field-mappings';

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
  vintageYear?: number[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.ownerOperatorInfo.description,
  })
  @IsOptional()
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];

  @ApiProperty({
    enum: ActiveAllowanceProgram,
    description: propertyMetadata.programCodeInfo.description,
  })
  @IsOptional()
  @IsAllowanceProgram(false, {
    each: true,
    message:
      ErrorMessages.AccountCharacteristics(true, 'programCodeInfo') +
      '?allowanceUIFilter=true&isActive=true',
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  programCodeInfo?: ActiveAllowanceProgram[];
}

export class PaginatedAllowanceHoldingsParamsDTO extends AllowanceHoldingsParamsDTO {
  @Min(1, {
    message: ErrorMessages.GreaterThanOrEqual('page', 1),
  })
  @IsDefined()
  @ApiProperty({
    description: propertyMetadata.page.description,
  })
  page: number;

  @IsInRange(1, PAGINATION_MAX_PER_PAGE, {
    message: ErrorMessages.Between('perPage', 1, PAGINATION_MAX_PER_PAGE),
  })
  @IsDefined()
  @ApiProperty({
    description: propertyMetadata.perPage.description,
  })
  perPage: number;
}

export class StreamAllowanceHoldingsParamsDTO extends AllowanceHoldingsParamsDTO {
  @ApiProperty({
    enum: ExcludeAllowanceHoldings,
    description: propertyMetadata.exclude.description,
  })
  @IsOptional()
  @IsInEnum(ExcludeAllowanceHoldings, {
    each: true,
    message: ErrorMessages.RemovableParameter(),
  })
  @IsInResponse(fieldMappings.allowances.holdings, {
    each: true,
    message: ErrorMessages.ValidParameter(),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  exclude?: ExcludeAllowanceHoldings[];
}
