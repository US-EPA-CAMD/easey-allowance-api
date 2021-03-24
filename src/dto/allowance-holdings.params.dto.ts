import { IsDefined } from 'class-validator';

export class AllowanceHoldingsParamsDTO {
  @IsDefined()
  vintageBeginYear: number;

  @IsDefined()
  vintageEndYear: number;
}
