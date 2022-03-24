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
} from '@us-epa-camd/easey-common/pipes';
import { PAGINATION_MAX_PER_PAGE } from '../config/app.config';

export function BeginDate() {
  return applyDecorators(
    IsInDateRange(
      [new Date('1993-03-23'), 'currentDate'],
      false,
      false,
      false,
      {
        message: ErrorMessages.DateRange(
          'transactionBeginDate',
          false,
          `a date between 03/23/1993 and the current date`,
        ),
      },
    ),
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
    IsInDateRange(
      [new Date('1993-03-23'), 'currentDate'],
      false,
      false,
      false,
      {
        message: ErrorMessages.DateRange(
          'transactionEndDate',
          false,
          `a date between 03/23/1993 and the current date`,
        ),
      },
    ),
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
    IsInRange(1, PAGINATION_MAX_PER_PAGE, {
      message: ErrorMessages.Between('perPage', 1, PAGINATION_MAX_PER_PAGE),
    }),
  );
}
