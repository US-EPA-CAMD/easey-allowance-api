import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import { IsYearFormat } from '@us-epa-camd/easey-common/pipes';

import { IsYearGreater } from '../pipes/is-year-greater.pipe';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { ActiveAllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { AllowanceParamsDTO } from './allowance.params.dto';

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

  @IsOptional()
  @ApiPropertyOptional({
    description: propertyMetadata.page.description,
  })
  page: number;

  @IsOptional()
  @ApiPropertyOptional({
    description: propertyMetadata.perPage.description,
  })
  perPage: number;
}
