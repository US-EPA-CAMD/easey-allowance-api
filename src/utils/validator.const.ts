import { applyDecorators } from '@nestjs/common';
import { IsDefined } from 'class-validator';

import { IsInDateRange } from '../pipes/is-in-date-range.pipe';
import { ErrorMessages } from './error-messages';
import { IsIsoFormat } from '../pipes/is-iso-format.pipe';
import { IsValidDate } from '../pipes/is-valid-date.pipe';
import { IsDateGreaterThanEqualTo } from '../pipes/is-date-greater.pipe';

export function BeginDate() {
  return applyDecorators(
    IsInDateRange([new Date('1993-03-23'), new Date()], {
      message: ErrorMessages.DateRange(
        'transactionBeginDate',
        `a date between 03/23/1993 and the current date`,
      ),
    }),
    IsValidDate({
      message: ErrorMessages.DateValidity(),
    }),
    IsIsoFormat({
      message: ErrorMessages.SingleFormat('transactionBeginDate', 'YYYY-MM-DD format'),
    }),
    IsDefined({
      message: ErrorMessages.RequiredProperty(),
    }),
  );
}

export function EndDate() {
  return applyDecorators(
    IsDateGreaterThanEqualTo('transactionBeginDate', {
      message: ErrorMessages.BeginEndDate('transactionBeginDate'),
    }),
    IsInDateRange([new Date('1993-03-23'), new Date()], {
      message: ErrorMessages.DateRange(
        'transactionEndDate',
        `a date between 03/23/1993 and the current date`,
      ),
    }),
    IsValidDate({
      message: ErrorMessages.DateValidity(),
    }),
    IsIsoFormat({
      message: ErrorMessages.SingleFormat('transactionEndDate', 'YYYY-MM-DD format'),
    }),
    IsDefined({ message: ErrorMessages.RequiredProperty() }),
  );
}
