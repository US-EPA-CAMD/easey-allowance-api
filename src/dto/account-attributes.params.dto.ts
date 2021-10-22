import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { AllowanceParamsDTO } from './allowance.params.dto';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { ErrorMessages } from '../utils/error-messages';
import { AllowanceProgram } from '../enum/allowance-programs.enum';

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
