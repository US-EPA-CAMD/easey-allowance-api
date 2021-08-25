import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaginationDTO } from './pagination.dto';
import { State } from '../enum/state.enum';

export class ComplianceParamsDTO extends PaginationDTO {
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  year?: number[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  state?: State[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  orisCode?: number[];

  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  ownerOperator?: string[];

  @ApiProperty({
    description:
      'Attaches a file with data in the format specified by the Accept header',
  })
  attachFile?: boolean;
}
