import { IsDefined } from 'class-validator';
import { PaginationDTO } from './pagination.dto';

export class AllowanceHoldingsParamsDTO extends PaginationDTO {
  @IsDefined()
  vintageBeginYear: number;

  @IsDefined()
  vintageEndYear: number;
}
