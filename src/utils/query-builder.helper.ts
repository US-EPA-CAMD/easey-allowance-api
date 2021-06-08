import { Regex } from './regex';

export class QueryBuilderHelper {
  private static paginationHelper(query: any, page: number, perPage: number) {
    query.skip((page - 1) * perPage).take(perPage);
    return query;
  }

  public static createAllowanceQuery(
    query: any,
    dto: any,
    param: string[],
    allowanceAlias: string,
    accountAlias: string,
  ) {
    if (param.includes('vintageYear') && dto.vintageYear) {
      query.andWhere(`${allowanceAlias}.vintageYear IN (:...vintageYears)`, {
        vintageYears: dto.vintageYear,
      });
    }

    if (param.includes('accountNumber') && dto.accountNumber) {
      query.andWhere(
        `UPPER(${allowanceAlias}.accountNumber) IN (:...accountNumber)`,
        {
          accountNumber: dto.accountNumber.map(accountNumber => {
            return accountNumber.toUpperCase();
          }),
        },
      );
    }

    if (param.includes('orisCode') && dto.orisCode) {
      query.andWhere(`${accountAlias}.orisCode IN (:...orisCodes)`, {
        orisCodes: dto.orisCode,
      });
    }

    if (param.includes('ownerOperator') && dto.ownerOperator) {
      let string = '(';

      for (let i = 0; i < dto.ownerOperator.length; i++) {
        const regex = Regex.commaDelimited(dto.ownerOperator[i].toUpperCase());

        if (i === 0) {
          string += `(UPPER(${accountAlias}.ownDisplay) ~* ${regex}) `;
        } else {
          string += `OR (UPPER(${accountAlias}.ownDisplay) ~* ${regex}) `;
        }
      }

      string += ')';
      query.andWhere(string);
    }

    if (param.includes('state') && dto.state) {
      query.andWhere(`UPPER(${accountAlias}.state) IN (:...states)`, {
        states: dto.state.map(state => {
          return state.toUpperCase();
        }),
      });
    }

    if (param.includes('program') && dto.program) {
      query.andWhere(`UPPER(${allowanceAlias}.prgCode) IN (:...programs)`, {
        programs: dto.program.map(program => {
          return program.toUpperCase();
        }),
      });
    }

    if (param.includes('accountType') && dto.accountType) {
      query.andWhere(
        `UPPER(${accountAlias}.accountType) IN (:...accountTypes)`,
        {
          accountTypes: dto.accountType.map(accountType => {
            return accountType.toUpperCase();
          }),
        },
      );
    }

    if (dto.page && dto.perPage) {
      query = this.paginationHelper(query, dto.page, dto.perPage);
    }

    return query;
  }
}
