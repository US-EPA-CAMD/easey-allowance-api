import { Regex } from '@us-epa-camd/easey-common/utilities';

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
    transactionTypeAlias = null,
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

    if (param.includes('facilityId') && dto.facilityId) {
      query.andWhere(`${characteristicAlias}.facilityId IN (:...facilityIds)`, {
        facilityIds: dto.facilityId,
      });
    }

    if (param.includes('ownerOperator') && dto.ownerOperator) {
      let string = '(';

      for (let i = 0; i < dto.ownerOperator.length; i++) {
        const regex = Regex.commaDelimited(dto.ownerOperator[i].toUpperCase());

        if (i === 0) {
          string += `(UPPER(${characteristicAlias}.ownerOperator) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(${characteristicAlias}.ownerOperator) ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (param.includes('stateCode') && dto.stateCode) {
      query.andWhere(`UPPER(${characteristicAlias}.stateCode) IN (:...states)`, {
        states: dto.stateCode.map(state => {
          return state.toUpperCase();
        }),
      });
    }

    if (param.includes('programCodeInfo') && dto.programCodeInfo) {
      query.andWhere(`UPPER(${dataAlias}.programCodeInfo) IN (:...programs)`, {
        programs: dto.programCodeInfo.map(program => {
          return program.toUpperCase();
        }),
      });
    }

    if (param.includes('accountType') && dto.accountType) {
      query.andWhere(
        `UPPER(${transactionTypeAlias}.accountTypeDescription) IN (:...accountTypes)`,
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
    buyAccountTypeAlias: string,
    sellAccountTypeAlias: string,
    transactionTypeAlias: string,
  ) {
    if (param.includes('accountType') && dto.accountType) {
      query.andWhere(
        `(UPPER(${buyAccountTypeAlias}.accountTypeDescription) IN (:...accountTypes) OR UPPER(${sellAccountTypeAlias}.accountTypeDescription) IN (:...accountTypes))`,
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

    if (param.includes('facilityId') && dto.facilityId) {
      query.andWhere(
        `(${alias}.buyFacilityId IN (:...facilityIds) OR ${alias}.sellFacilityId IN (:...facilityIds))`,
        {
          facilityIds: dto.facilityId,
        },
      );
    }

    if (param.includes('ownerOperator') && dto.ownerOperator) {
      let string = '(';

      for (let i = 0; i < dto.ownerOperator.length; i++) {
        const regex = Regex.commaDelimited(dto.ownerOperator[i].toUpperCase());

        if (i === 0) {
          string += `(UPPER(${alias}.buyOwner) ~* ${regex} OR UPPER(${alias}.sellOwner)  ~* ${regex} ) `;
        } else {
          string += `OR (UPPER(${alias}.buyOwner) ~* ${regex} OR UPPER(${alias}.sellOwner)  ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (param.includes('stateCode') && dto.stateCode) {
      query.andWhere(
        `(UPPER(${alias}.buyState) IN (:...states) OR UPPER(${alias}.sellState) IN (:...states))`,
        {
          states: dto.stateCode.map(state => {
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
        `UPPER(${transactionTypeAlias}.transactionTypeDescription) IN (:...transactionTypes)`,
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
    ownerAlias = 'odf',
  ) {
    if (param.includes('year') && dto.year) {
      query.andWhere(`${complianceAlias}.year IN (:...years)`, {
        years: dto.year,
      });
    }

    if (param.includes('ownerOperator') && dto.ownerOperator) {
      let string = '(';

      for (let i = 0; i < dto.ownerOperator.length; i++) {
        const regex = Regex.commaDelimited(dto.ownerOperator[i].toUpperCase());

        if (i === 0) {
          string += `(UPPER(${ownerAlias}.owner) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(${ownerAlias}.operator) ~* ${regex}) `;
        }
      }
      string += ')';
      query.andWhere(string);
    }

    if (dto.page && dto.perPage) {
      query = this.paginationHelper(query, dto.page, dto.perPage);
    }
    return query;
  }
}
