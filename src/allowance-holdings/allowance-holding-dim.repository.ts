import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import {
  AllowanceHoldingsParamsDTO,
  PaginatedAllowanceHoldingsParamsDTO,
  StreamAllowanceHoldingsParamsDTO,
} from '../dto/allowance-holdings.params.dto';
import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { ReadStream } from 'fs';

@EntityRepository(AllowanceHoldingDim)
export class AllowanceHoldingDimRepository extends Repository<
  AllowanceHoldingDim
> {
  getStreamQuery(params: StreamAllowanceHoldingsParamsDTO) {
    return this.buildQuery(params, true).getQueryAndParameters();
  }

  async getAllowanceHoldings(
    paginatedAllowanceHoldingsParamsDTO: PaginatedAllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingDim[]> {
    const { page, perPage } = paginatedAllowanceHoldingsParamsDTO;

    const query = this.buildQuery(paginatedAllowanceHoldingsParamsDTO, false);

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    }

    return query.getMany();
  }

  async getAllApplicableAllowanceHoldingsAttributes(): Promise<any> {
    const query = this.createQueryBuilder('ahd')
      .select(
        [
          'ahd.vintageYear',
          'ahd.programCodeInfo',
          'af.accountNumber',
          'af.accountTypeCode',
          'af.facilityId',
          'af.stateCode',
          'aod.ownerOperator',
        ].map(col => {
          if (col === 'ahd.programCodeInfo') {
            return `${col} AS "programCode"`;
          } else {
            return `${col} AS "${col.split('.')[1]}"`;
          }
        }),
      )
      .innerJoin('ahd.accountFact', 'af')
      .leftJoin('af.accountOwnerDim', 'aod')
      .distinctOn([
        'ahd.vintage_year',
        'ahd.prg_code',
        'af.account_number',
        'af.account_type_code',
        'af.orispl_code',
        'af.stateCode',
        'aod.own_display',
      ]);

    return query.getRawMany();
  }

  private getColumns(isStreamed: boolean): string[] {
    const columns = [
      'ahd.accountNumber',
      'ahd.accountName',
      'af.facilityId',
      'ahd.programCodeInfo',
      'ahd.vintageYear',
      'ahd.totalBlock',
      'ahd.startBlock',
      'ahd.endBlock',
      'af.stateCode',
      'af.epaRegion',
      'af.ownerOperator',
      'af.accountType',
      'atc.accountTypeDescription',
    ];

    const newCol = columns.map(col => {
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

    if (isStreamed) {
      newCol.splice(columns.indexOf('af.accountType'), 1);
    }

    return newCol;
  }

  private buildQuery(
    params: AllowanceHoldingsParamsDTO | PaginatedAllowanceHoldingsParamsDTO,
    isStreamed = false,
  ): SelectQueryBuilder<AllowanceHoldingDim> {
    let query = this.createQueryBuilder('ahd')
      .select(this.getColumns(isStreamed))
      .innerJoin('ahd.accountFact', 'af')
      .innerJoin('af.accountTypeCd', 'atc');

    query = QueryBuilderHelper.createAccountQuery(
      query,
      params,
      [
        'vintageYear',
        'accountNumber',
        'facilityId',
        'ownerOperator',
        'stateCode',
        'programCodeInfo',
        'accountType',
      ],
      'ahd',
      'af',
      false,
      'atc',
    );

    query
      .orderBy('ahd.programCodeInfo')
      .addOrderBy('ahd.accountNumber')
      .addOrderBy('ahd.vintageYear')
      .addOrderBy('ahd.startBlock');

    return query;
  }
}
