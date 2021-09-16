import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { ErrorMessages } from '../utils/error-messages';
import { IsYearFormat } from '../pipes/is-year-format.pipe';
import { IsYearGreater } from '../pipes/is-year-greater.pipe';
import { AccountAttributesParamsDTO } from './account-attributes.params.dto';

export class AllowanceHoldingsParamsDTO extends AccountAttributesParamsDTO {
  @IsOptional()
  @IsYearFormat({
    each: true,
    message: ErrorMessages.MultipleFormat('vintageYear', 'YYYY'),
  })
  @IsYearGreater(1995, {
    each: true,
    message: ErrorMessages.YearRange('vintageYear', '1995'),
  })
  @Transform((value: string) => value.split('|').map(item => item.trim()))
  vintageYear?: number[];
}
