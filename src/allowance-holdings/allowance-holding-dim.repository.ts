import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import {
  AllowanceHoldingsParamsDTO,
  PaginatedAllowanceHoldingsParamsDTO,
} from '../dto/allowance-holdings.params.dto';
import { QueryBuilderHelper } from '../utils/query-builder.helper';

@EntityRepository(AllowanceHoldingDim)
export class AllowanceHoldingDimRepository extends Repository<
  AllowanceHoldingDim
> {
  async getAllowanceHoldings(
    paginatedAllowanceHoldingsParamsDTO: PaginatedAllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingDim[]> {
    let totalCount: number;
    let results: AllowanceHoldingDim[];
    const { page, perPage } = paginatedAllowanceHoldingsParamsDTO;

    const query = this.buildQuery(paginatedAllowanceHoldingsParamsDTO);
    

    if (page && perPage) {
      [results, totalCount] = await query.getManyAndCount();
      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    } else {
      results = await query.getMany();
    }

    return results;
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

  private getColumns(): string[] {
    return [
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
  }

  private buildQuery(
    params: AllowanceHoldingsParamsDTO | PaginatedAllowanceHoldingsParamsDTO,
  ): SelectQueryBuilder<AllowanceHoldingDim> {
    let query = this.createQueryBuilder('ahd')
      .select(this.getColumns())
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
