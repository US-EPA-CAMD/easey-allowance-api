import { IsOptional } from 'class-validator';
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
import { IsInEnum, IsInResponse } from '@us-epa-camd/easey-common/pipes';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { fieldMappings } from '../constants/field-mappings';
import { Page, PerPage } from '../utils/validator.const';

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
