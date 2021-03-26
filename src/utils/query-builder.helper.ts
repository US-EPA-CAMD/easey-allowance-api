export class QueryBuilderHelper {
  public static createAllowanceQuery(
    query: any,
    dto: any,
    param: string[],
    allowanceAlias: string,
    accountAlias: string,
  ) {
    if (param.includes('vintageBeginYear') && dto.vintageBeginYear) {
      query.andWhere(`${allowanceAlias}.vintageYear >= :vintageBeginYear`, {
        vintageBeginYear: dto.vintageBeginYear,
      });
    }

    if (param.includes('vintageEndYear') && dto.vintageEndYear) {
      query.andWhere(`${allowanceAlias}.vintageYear <= :vintageEndYear`, {
        vintageEndYear: dto.vintageEndYear,
      });
    }
    return query;
  }
}
