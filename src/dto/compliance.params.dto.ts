import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { PaginationDTO } from './pagination.dto';
import { State } from '../enum/state.enum';
import { IsStateCode } from '../pipes/is-state-code.pipe';
import { ErrorMessages } from '../utils/error-messages';
import { IsOrisCode } from '../pipes/is-oris-code.pipe';

export class ComplianceParamsDTO extends PaginationDTO {
  @ApiProperty({
    enum: State,
    description: propertyMetadata.state.description,
  })
  @IsOptional()
  @IsStateCode({
    each: true,
    message: ErrorMessages.AccountCharacteristics(true, 'state'),
  })
    @Transform(({ value }) => value.split('|').map(item => item.trim()))
  state?: State[];

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

  @ApiProperty({
    description:
      'Attaches a file with data in the format specified by the Accept header',
  })
  attachFile?: boolean;
}
