import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { ErrorMessages } from '@us-epa-camd/easey-common/constants';
import {
  IsIsoFormat,
  IsValidDate,
  IsDateGreaterThanEqualTo,
  IsInDateRange,
  Min,
  IsInRange,
  IsDateInRangeLimit,
} from '@us-epa-camd/easey-common/pipes';
import {
  PAGINATION_MAX_PER_PAGE,
  TRANSACTION_DATE_LIMIT_YEARS,
} from '../config/app.config';

export function BeginDate() {
  return applyDecorators(
    IsInDateRange(new Date('1993-03-23'), false, false, false, {
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
    IsNotEmpty({ message: ErrorMessages.RequiredProperty() }),
  );
}

export function EndDate() {
  return applyDecorators(
    IsDateGreaterThanEqualTo('transactionBeginDate', {
      message: ErrorMessages.BeginEndDate('transactionBeginDate'),
    }),
    IsDateInRangeLimit(
      'transactionBeginDate',
      Number(TRANSACTION_DATE_LIMIT_YEARS),
      {
        message: ErrorMessages.DateRangeLimit(
          'transactionBeginDate',
          Number(TRANSACTION_DATE_LIMIT_YEARS),
        ),
      },
    ),
    IsInDateRange(new Date('1993-03-23'), false, false, false, {
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
    IsNotEmpty({ message: ErrorMessages.RequiredProperty() }),
  );
}

export function Page() {
  return applyDecorators(
    IsNotEmpty({ message: ErrorMessages.RequiredProperty() }),
    Min(1, {
      message: ErrorMessages.GreaterThanOrEqual('page', 1),
    }),
  );
}

export function PerPage() {
  return applyDecorators(
    IsNotEmpty({ message: ErrorMessages.RequiredProperty() }),
    IsInRange(1, Number(PAGINATION_MAX_PER_PAGE), {
      message: ErrorMessages.Between(
        'perPage',
        1,
        Number(PAGINATION_MAX_PER_PAGE),
      ),
    }),
  );
}
