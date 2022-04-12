import { Repository, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';

import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AccountFact } from '../entities/account-fact.entity';
import { QueryBuilderHelper } from '../utils/query-builder.helper';
import {
  AccountAttributesParamsDTO,
  PaginatedAccountAttributesParamsDTO,
  StreamAccountAttributesParamsDTO,
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

  getStreamQuery(params: StreamAccountAttributesParamsDTO) {
    return this.buildQuery(params, true).getQueryAndParameters();
  }

  async getAllAccountAttributes(
    paginatedAccountAttributesParamsDTO,
    req: Request,
  ): Promise<AccountFact[]> {
    const { page, perPage } = paginatedAccountAttributesParamsDTO;

    const query = this.buildQuery(paginatedAccountAttributesParamsDTO, false);

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    }
    return query.getMany();
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

  private getColumns(isStreamed: boolean): string[] {
    const columns = [
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

    return columns.map(col => {
      if (isStreamed) {
        if (col === 'atc.accountTypeDescription') {
          return `${col} AS "accountType"`;
        } else {
          return `${col} AS "${col.split('.')[1]}"`;
        }
      } else {
        return col;
      }
    });
  }

  private buildQuery(
    params: AccountAttributesParamsDTO | PaginatedAccountAttributesParamsDTO,
    isStreamed = false,
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
