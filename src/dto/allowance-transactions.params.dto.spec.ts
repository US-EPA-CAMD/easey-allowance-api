import { validate } from 'class-validator';

import { IsYearFormat } from '@us-epa-camd/easey-common/pipes';

import { IsYearGreater } from '../pipes/is-year-greater.pipe';
import { BeginDate, EndDate } from '../utils/validator.const';

describe('-- Allowance Transactions Params DTO --', () => {
  describe('getAllowanceTransactions with query parameters', () => {
    class MyClass {
      constructor(
        vintageYear: string,
        transactionBeginDate: string,
        transactionEndDate: string,
      ) {
        this.vintageYear = vintageYear;
        this.transactionBeginDate = transactionBeginDate;
        this.transactionEndDate = transactionEndDate;
      }

      @IsYearFormat()
      @IsYearGreater(1995)
      vintageYear: string;

      @BeginDate()
      transactionBeginDate: string;

      @EndDate()
      transactionEndDate: string;
    }

    it('should pass all validation pipes', async () => {
      const results = await validate(
        new MyClass(
          '2019',
          '2019-01-01',
          '2019-01-01',
        ),
      );
      expect(results.length).toBe(0);
    });

    it('should fail one of validation pipes (vintageYear)', async () => {
      const results = await validate(
        new MyClass(
          '1945',
          '2019-01-01',
          '2019-01-01',
        ),
      );
      expect(results.length).toBe(1);
    });

    it('should fail all of the validation pipes', async () => {
      const results = await validate(
        new MyClass(
          '1945',
          'beginDate',
          'endDate',
        ),
      );
      expect(results.length).toBe(3);
    });
  });
});
