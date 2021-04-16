import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationDTO } from './pagination.dto';

export class AllowanceHoldingsParamsDTO extends PaginationDTO {
  @IsOptional()
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  vintageYear?: number [];
}
