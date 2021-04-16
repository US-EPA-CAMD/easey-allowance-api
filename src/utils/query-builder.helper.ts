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
      query.andWhere(`${allowanceAlias}.vintageYear IN (:vintageYear)`, {
        vintageYear: dto.vintageYear,
      });
    }

    if (dto.page && dto.perPage) {
      query = this.paginationHelper(query, dto.page, dto.perPage);
    }

    return query;
  }
}
