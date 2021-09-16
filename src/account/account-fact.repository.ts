import { Repository, EntityRepository } from 'typeorm';
import { Request } from 'express';

import { AccountFact } from '../entities/account-fact.entity';
import { ResponseHeaders } from '../utils/response.headers';
import { QueryBuilderHelper } from '../utils/query-builder.helper';

@EntityRepository(AccountFact)
export class AccountFactRepository extends Repository<AccountFact> {
  async getAllAccounts(): Promise<AccountFact[]> {
    const query = this.createQueryBuilder('af')
      .select(['af.accountNumber', 'af.accountName'])
      .distinctOn(['af.accountNumber'])
      .orderBy('af.accountNumber');
    return query.getMany();
  }

  async getAllAccountAttributes(
    accountAttributesParamsDTO,
    req: Request,
  ): Promise<AccountFact[]> {
    const { page, perPage } = accountAttributesParamsDTO;

    let query = this.createQueryBuilder('af').select([
      'af.accountNumber',
      'af.accountName',
      'af.prgCode',
      'af.accountType',
      'af.orisCode',
      'af.unitId',
      'af.ownDisplay',
      'af.state',
      'af.epaRegion',
      'af.nercRegion',
    ]);

    query = QueryBuilderHelper.createAccountQuery(
      query,
      accountAttributesParamsDTO,
      [
        'accountNumber',
        'program',
        'orisCode',
        'ownerOperator',
        'state',
        'accountType',
      ],
      'af',
      'af',
      false,
    );

    query.orderBy('af.accountNumber').addOrderBy('af.prgCode');

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }
    return query.getMany();
  }
}
