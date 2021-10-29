import { Repository, EntityRepository } from 'typeorm';
import { Request } from 'express';

import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AccountFact } from '../entities/account-fact.entity';
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
      'af.programCodeInfo',
      'af.accountType',
      'af.facilityId',
      'af.unitId',
      'af.ownerOperator',
      'af.state',
      'af.epaRegion',
      'af.nercRegion',
    ]);

    query = QueryBuilderHelper.createAccountQuery(
      query,
      accountAttributesParamsDTO,
      [
        'accountNumber',
        'programCodeInfo',
        'facilityId',
        'ownerOperator',
        'state',
        'accountType',
      ],
      'af',
      'af',
      false,
    );

    query.orderBy('af.accountNumber').addOrderBy('af.programCodeInfo');

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }
    return query.getMany();
  }

  async getAllApplicableAccountAttributes(): Promise<any> {
    const query = this.createQueryBuilder('af')
      .select([
        'af.accountNumber',
        'af.accountName',
        'af.programCodeInfo',
        'af.accountType',
        'af.facilityId',
        'af.state',
        'aod.ownerOperator',
      ])
      .leftJoin('af.accountOwnerDim', 'aod')
      .distinctOn([
        'af.account_number',
        'af.account_name',
        'af.prg_code',
        'af.account_type',
        'af.orispl_code',
        'af.state',
        'aod.own_display',
      ]);

    return query.getMany();
  }
}
