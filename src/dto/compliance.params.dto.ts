import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  propertyMetadata,
  ErrorMessages,
} from '@us-epa-camd/easey-common/constants';
import { State } from '@us-epa-camd/easey-common/enums';
import { IsOrisCode } from '@us-epa-camd/easey-common/pipes';

import { IsStateCode } from '../pipes/is-state-code.pipe';

export class ComplianceParamsDTO {
  @ApiProperty({
    enum: State,
    description: propertyMetadata.stateCode.description,
  })
  @IsOptional()
  @IsStateCode({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'stateCode'),
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  stateCode?: State[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.facilityId.description,
  })
  @IsOptional()
  @IsOrisCode({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'facilityId'),
  })
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  facilityId?: number[];

  @ApiProperty({
    isArray: true,
    description: propertyMetadata.ownerOperatorInfo.description,
  })
  @IsOptional()
  @Transform(({ value }) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];
}
