import { Regex } from './regex';

export class QueryBuilderHelper {
  private static paginationHelper(query: any, page: number, perPage: number) {
    query.skip((page - 1) * perPage).take(perPage);
    return query;
  }

  public static createAccountQuery(
    query: any,
    dto: any,
    param: string[],
    dataAlias: string,
    characteristicAlias: string,
    additionalQuery: boolean,
  ) {
    if (param.includes('vintageYear') && dto.vintageYear) {
      query.andWhere(`${dataAlias}.vintageYear IN (:...vintageYears)`, {
        vintageYears: dto.vintageYear,
      });
    }

    if (param.includes('accountNumber') && dto.accountNumber) {
      query.andWhere(
        `UPPER(${dataAlias}.accountNumber) IN (:...accountNumber)`,
        {
          accountNumber: dto.accountNumber.map(accountNumber => {
            return accountNumber.toUpperCase();
          }),
        },
      );
    }

    if (param.includes('orisCode') && dto.orisCode) {
      query.andWhere(`${characteristicAlias}.orisCode IN (:...orisCodes)`, {
        orisCodes: dto.orisCode,
      });
    }

    if (param.includes('ownerOperator') && dto.ownerOperator) {
      let string = '(';

      for (let i = 0; i < dto.ownerOperator.length; i++) {
        const regex = Regex.commaDelimited(dto.ownerOperator[i].toUpperCase());

        if (i === 0) {
          string += `(UPPER(${characteristicAlias}.ownDisplay) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(${characteristicAlias}.ownDisplay) ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (param.includes('state') && dto.state) {
      query.andWhere(`UPPER(${characteristicAlias}.state) IN (:...states)`, {
        states: dto.state.map(state => {
          return state.toUpperCase();
        }),
      });
    }

    if (param.includes('program') && dto.program) {
      query.andWhere(`UPPER(${dataAlias}.prgCode) IN (:...programs)`, {
        programs: dto.program.map(program => {
          return program.toUpperCase();
        }),
      });
    }

    if (param.includes('accountType') && dto.accountType) {
      query.andWhere(
        `UPPER(${characteristicAlias}.accountType) IN (:...accountTypes)`,
        {
          accountTypes: dto.accountType.map(accountType => {
            return accountType.toUpperCase();
          }),
        },
      );
    }

    if (!additionalQuery && dto.page && dto.perPage) {
      query = this.paginationHelper(query, dto.page, dto.perPage);
    }

    return query;
  }

  public static createTransactionQuery(
    query: any,
    dto: any,
    param: string[],
    alias: string,
  ) {
    if (param.includes('accountType') && dto.accountType) {
      query.andWhere(
        `(UPPER(${alias}.buyAccountType) IN (:...accountTypes) OR UPPER(${alias}.sellAccountType) IN (:...accountTypes))`,
        {
          accountTypes: dto.accountType.map(accountType => {
            return accountType.toUpperCase();
          }),
        },
      );
    }

    if (param.includes('accountNumber') && dto.accountNumber) {
      query.andWhere(
        `(UPPER(${alias}.buyAccountNumber) IN (:...accountNumbers) OR UPPER(${alias}.sellAccountNumber) IN (:...accountNumbers))`,
        {
          accountNumbers: dto.accountNumber.map(accountNumber => {
            return accountNumber.toUpperCase();
          }),
        },
      );
    }

    if (param.includes('orisCode') && dto.orisCode) {
      query.andWhere(
        `(${alias}.buyOrisplCode IN (:...orisCodes) OR ${alias}.sellOrisplCode IN (:...orisCodes))`,
        {
          orisCodes: dto.orisCode,
        },
      );
    }

    if (param.includes('ownerOperator') && dto.ownerOperator) {
      let string = '(';

      for (let i = 0; i < dto.ownerOperator.length; i++) {
        const regex = Regex.commaDelimited(dto.ownerOperator[i].toUpperCase());

        if (i === 0) {
          string += `(UPPER(${alias}.buyOwnDisplayName) ~* ${regex} OR UPPER(${alias}.sellOwnDisplayName)  ~* ${regex} ) `;
        } else {
          string += `OR (UPPER(${alias}.buyOwnDisplayName) ~* ${regex} OR UPPER(${alias}.sellOwnDisplayName)  ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (param.includes('state') && dto.state) {
      query.andWhere(
        `(UPPER(${alias}.buyState) IN (:...states) OR UPPER(${alias}.sellState) IN (:...states))`,
        {
          states: dto.state.map(state => {
            return state.toUpperCase();
          }),
        },
      );
    }

    if (param.includes('transactionBeginDate') && dto.transactionBeginDate) {
      query.andWhere(`${alias}.transactionDate >= (:transactionBeginDate)`, {
        transactionBeginDate: dto.transactionBeginDate,
      });
    }

    if (param.includes('transactionEndDate') && dto.transactionEndDate) {
      query.andWhere(`${alias}.transactionDate <= (:transactionEndDate)`, {
        transactionEndDate: dto.transactionEndDate,
      });
    }

    if (param.includes('transactionType') && dto.transactionType) {
      query.andWhere(
        `UPPER(${alias}.transactionType) IN (:...transactionTypes)`,
        {
          transactionTypes: dto.transactionType.map(transactionType => {
            return transactionType.toUpperCase();
          }),
        },
      );
    }

    if (dto.page && dto.perPage) {
      query = this.paginationHelper(query, dto.page, dto.perPage);
    }
    return query;
  }

  public static createComplianceQuery(
    query: any,
    dto: any,
    param: string[],
    complianceAlias: string,
  ) {
    if (param.includes('year') && dto.year) {
      query.andWhere(`${complianceAlias}.year IN (:...years)`, {
        years: dto.year,
      });
    }

    if (dto.page && dto.perPage) {
      query = this.paginationHelper(query, dto.page, dto.perPage);
    }
    return query;
  }
}
