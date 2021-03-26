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
    if (dto.page && dto.perPage) {
      query = this.paginationHelper(query, dto.page, dto.perPage);
    }

    return query;
  }
}
