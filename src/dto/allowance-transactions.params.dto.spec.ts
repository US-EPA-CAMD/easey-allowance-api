import { validate } from 'class-validator';
import * as typeorm from 'typeorm';
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon';

import { IsAccountType } from '../pipes/is-account-type.pipe';
import { IsAccountNumber } from '../pipes/is-account-number.pipe';
import { IsOrisCode } from '../pipes/is-oris-code.pipe';
import { IsStateCode } from '../pipes/is-state-code.pipe';
import { IsYearFormat } from '../pipes/is-year-format.pipe';
import { IsYearGreater } from '../pipes/is-year-greater.pipe';
import { IsAllowanceProgram } from '../pipes/is-allowance-program.pipe';
import { BeginDate, EndDate } from '../utils/validator.const';
import { IsTransactionType } from 'src/pipes/is-transaction-type.pipe';


describe('-- Allowance Transactions Params DTO --', () => {
  describe('getAllowanceTransactions with query parameters', () => {
    class MyClass {
      constructor(
        accountType: string,
        accountNumber: string,
        orisCode: string,
        state: string,
        vintageYear: string,
        program: string,
        transactionType: string,
        transactionBeginDate: string,
        transactionEndDate: string,
      ) {
        this.accountType = accountType;
        this.accountNumber = accountNumber;
        this.orisCode = orisCode;
        this.state = state;
        this.vintageYear = vintageYear;
        this.program = program;
        this.transactionType = transactionType
        this.transactionBeginDate = transactionBeginDate;
        this.transactionEndDate = transactionEndDate;

      }
      @IsAccountType()
      accountType: string;

      @IsAccountNumber()
      accountNumber: string;

      @IsOrisCode()
      orisCode: string;

      @IsStateCode()
      state: string;

      @IsYearFormat()
      @IsYearGreater(1995)
      vintageYear: string;

      @IsAllowanceProgram(false)
      program: string;

      @IsTransactionType()
      transactionType: string;

      @BeginDate()
      transactionBeginDate: string;
      
      @EndDate()
      transactionEndDate: string;
    }

    /**
     * This class is used to mock EntityManager and ConnectionManager
     */
    class Mock {
      sandbox: SinonSandbox;
      constructor(method: string | any, fakeData: any, args?: any) {
        this.sandbox = createSandbox();
        if (args) {
          this.sandbox
            .stub(typeorm, method)
            .withArgs(args)
            .returns(fakeData);
        } else {
          this.sandbox.stub(typeorm, method).returns(fakeData);
        }
      }
      close() {
        this.sandbox.restore();
      }
    }
    let mock: Mock;
    const fakeManager = createStubInstance(typeorm.EntityManager);
    fakeManager.findOne.resolves(['value']);
    mock = new Mock('getManager', fakeManager);

    it('should pass all validation pipes', async () => {
      const results = await validate(
        new MyClass(
          'General Account',
          '000000000001',
          '3',
          'TX',
          '2019',
          'ARP',
          'Activate Conditional Allowances',
          '2019-01-01',
          '2019-01-01',
        ),
      );
      expect(results.length).toBe(0);
    });

    it('should fail one of validation pipes (vintageYear)', async () => {
      const results = await validate(
        new MyClass(
          'General Account',
          '000000000001',
          '3',
          'TX',
          '1945',
          'ARP',
          'Activate Conditional Allowances',
          '2019-01-01',
          '2019-01-01',
        ),
      );
      expect(results.length).toBe(1);
    });

    it('should fail all of the validation pipes', async () => {
      fakeManager.findOne.resolves(null);
      const results = await validate(
        new MyClass('general', '00001', 'oris', 'state', '1945', 'program', 'transactionType', 'beginDate', 'endDate'),
      );
      expect(results.length).toBe(8);
    });
    mock.close;
  });
});
