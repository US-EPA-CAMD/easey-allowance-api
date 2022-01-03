import { applyDecorators } from '@nestjs/common';
import { IsDefined } from 'class-validator';
import { ErrorMessages } from '@us-epa-camd/easey-common/constants';
import {
  IsIsoFormat,
  IsValidDate,
  IsDateGreaterThanEqualTo,
  IsInDateRange
} from '@us-epa-camd/easey-common/pipes';

export function BeginDate() {
  return applyDecorators(
    IsInDateRange([new Date('1993-03-23'), 'currentDate'], false, false, false, {
      message: ErrorMessages.DateRange(
        'transactionBeginDate',
        false,
        `a date between 03/23/1993 and the current date`,
      ),
    }),
    IsValidDate({
      message: ErrorMessages.DateValidity(),
    }),
    IsIsoFormat({
      message: ErrorMessages.SingleFormat(
        'transactionBeginDate',
        'YYYY-MM-DD format',
      ),
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
    IsInDateRange([new Date('1993-03-23'), 'currentDate'], false, false, false, {
      message: ErrorMessages.DateRange(
        'transactionEndDate',
        false,
        `a date between 03/23/1993 and the current date`,
      ),
    }),
    IsValidDate({
      message: ErrorMessages.DateValidity(),
    }),
    IsIsoFormat({
      message: ErrorMessages.SingleFormat(
        'transactionEndDate',
        'YYYY-MM-DD format',
      ),
    }),
    IsDefined({ message: ErrorMessages.RequiredProperty() }),
  );
}
