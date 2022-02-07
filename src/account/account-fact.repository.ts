import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';

import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AccountFact } from '../entities/account-fact.entity';
import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { ReadStream } from 'fs';
import { AccountAttributesStreamParamsDTO } from '../dto/account-attributes-stream.params.dto';
import { AccountAttributesParamsDTO } from '../dto/account-attributes.params.dto';

@EntityRepository(AccountFact)
export class AccountFactRepository extends Repository<AccountFact> {
  async getAllAccounts(): Promise<AccountFact[]> {
    const query = this.createQueryBuilder('af')
      .select(['af.accountNumber', 'af.accountName'])
      .distinctOn(['af.accountNumber'])
      .orderBy('af.accountNumber');
    return query.getMany();
  }

  streamAllAccountAttributes(
    params: AccountAttributesStreamParamsDTO,
  ): Promise<ReadStream> {
    return this.buildQuery(params, true).stream();
  }

  async getAllAccountAttributes(
    accountAttributesParamsDTO,
    req: Request,
  ): Promise<AccountFact[]> {
    const { page, perPage } = accountAttributesParamsDTO;

    let query = this.buildQuery(accountAttributesParamsDTO, false);

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
        'af.programCodeInfo',
        'af.accountTypeCode',
        'af.facilityId',
        'af.stateCode',
        'aod.ownerOperator',
      ])
      .leftJoin('af.accountOwnerDim', 'aod')
      .distinctOn([
        'af.account_number',
        'af.prg_code',
        'af.account_type_code',
        'af.orispl_code',
        'af.stateCode',
        'aod.own_display',
      ]);

    return query.getMany();
  }

  private getColumns(isStreamed: boolean): string[] {
    const columns = [
      'af.accountNumber',
      'af.accountName',
      'af.programCodeInfo',
      'af.accountType',
      'af.facilityId',
      'af.unitId',
      'af.ownerOperator',
      'af.stateCode',
      'af.epaRegion',
      'af.nercRegion',
      'atc.accountTypeDescription',
    ];

    return columns.map(col => {
      if (isStreamed) {
        return `${col} AS "${col.split('.')[1]}"`;
      } else {
        return col;
      }
    });
  }

  private buildQuery(
    params: AccountAttributesStreamParamsDTO | AccountAttributesParamsDTO,
    isStreamed: boolean = false,
  ): SelectQueryBuilder<AccountFact> {
    let query = this.createQueryBuilder('af')
      .select(this.getColumns(isStreamed))
      .innerJoin('af.accountTypeCd', 'atc');

    query = QueryBuilderHelper.createAccountQuery(
      query,
      params,
      [
        'accountNumber',
        'programCodeInfo',
        'facilityId',
        'ownerOperator',
        'stateCode',
        'accountType',
      ],
      'af',
      'af',
      false,
      'atc',
    );

    query.orderBy('af.accountNumber').addOrderBy('af.programCodeInfo');

    return query;
  }
}
