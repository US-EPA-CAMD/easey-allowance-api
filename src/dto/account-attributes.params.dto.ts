import { IsDefined, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import {
  AllowanceProgram,
  ExcludeAccountAttributes,
} from '@us-epa-camd/easey-common/enums';
import {
  Min,
  IsInRange,
  IsInEnum,
  IsInResponse,
} from '@us-epa-camd/easey-common/pipes';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { PAGINATION_MAX_PER_PAGE } from '../config/app.config';
import { fieldMappings } from '../constants/field-mappings';

export class AccountAttributesParamsDTO extends AllowanceParamsDTO {
  @ApiProperty({
    isArray: true,
    description: propertyMetadata.ownerOperatorInfo.description,
  })
  @IsOptional()
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];

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
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  programCodeInfo?: AllowanceProgram[];
}

export class PaginatedAccountAttributesParamsDTO extends AccountAttributesParamsDTO {
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

export class StreamAccountAttributesParamsDTO extends AccountAttributesParamsDTO {
  @ApiProperty({
    enum: ExcludeAccountAttributes,
    description: propertyMetadata.exclude.description,
  })
  @IsOptional()
  @IsInEnum(ExcludeAccountAttributes, {
    each: true,
    message: ErrorMessages.RemovableParameter(),
  })
  @IsInResponse(fieldMappings.allowances.accountAttributes, {
    each: true,
    message: ErrorMessages.ValidParameter(),
  })
  @Transform(({ value }) => value.split('|').map((item: string) => item.trim()))
  exclude?: ExcludeAccountAttributes[];
}
