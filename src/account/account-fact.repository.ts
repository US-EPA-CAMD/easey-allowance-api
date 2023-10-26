import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';

import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AccountFact } from '../entities/account-fact.entity';
import { QueryBuilderHelper } from '../utils/query-builder.helper';
import {
  AccountAttributesParamsDTO,
  PaginatedAccountAttributesParamsDTO,
} from '../dto/account-attributes.params.dto';

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
    paginatedAccountAttributesParamsDTO,
    req: Request,
  ): Promise<AccountFact[]> {
    let totalCount: number;
    let results: AccountFact[];
    const { page, perPage } = paginatedAccountAttributesParamsDTO;

    const query = this.buildQuery(paginatedAccountAttributesParamsDTO);

    if (page && perPage) {
      [results, totalCount] = await query.getManyAndCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    }else{
      results = await query.getMany();
    }
    return results;
  }

  async getAllApplicableAccountAttributes(): Promise<any> {
    const query = this.createQueryBuilder('af')
      .select(
        [
          'af.programCodeInfo',
          'af.facilityId',
          'af.stateCode',
          'af.accountNumber',
          'af.accountTypeCode',
          'aod.ownerOperator',
        ].map(col => {
          if (col === 'af.programCodeInfo') {
            return `${col} AS "programCode"`;
          } else {
            return `${col} AS "${col.split('.')[1]}"`;
          }
        }),
      )
      .leftJoin('af.accountOwnerDim', 'aod')
      .distinctOn([
        'af.account_number',
        'af.prg_code',
        'af.account_type_code',
        'af.orispl_code',
        'af.stateCode',
        'aod.own_display',
      ]);

    return query.getRawMany();
  }

  private getColumns(): string[] {
    return [
      'af.accountNumber',
      'af.accountName',
      'af.programCodeInfo',
      'atc.accountTypeDescription',
      'af.facilityId',
      'af.unitId',
      'af.ownerOperator',
      'af.stateCode',
      'af.epaRegion',
      'af.nercRegion',
    ];
  }

  private buildQuery(
    params: AccountAttributesParamsDTO | PaginatedAccountAttributesParamsDTO,
  ): SelectQueryBuilder<AccountFact> {
    let query = this.createQueryBuilder('af')
      .select(this.getColumns())
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
