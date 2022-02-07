import { IsDefined, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import { AllowanceProgram } from '@us-epa-camd/easey-common/enums';
import { Min, IsInRange } from '@us-epa-camd/easey-common/pipes';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { PAGINATION_MAX_PER_PAGE } from '../config/app.config';

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
