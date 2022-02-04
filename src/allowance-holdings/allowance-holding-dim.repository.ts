import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { QueryBuilderHelper } from '../utils/query-builder.helper';
import { ReadStream } from 'fs';
import { AllowanceHoldingsParamsStreamDTO } from 'src/dto/allowance-holdings-stream.params.dto';

@EntityRepository(AllowanceHoldingDim)
export class AllowanceHoldingDimRepository extends Repository<
  AllowanceHoldingDim
> {
  streamAllowanceHoldings(
    params: AllowanceHoldingsParamsStreamDTO,
  ): Promise<ReadStream> {
    return this.buildQuery(params, true).stream();
  }

  async getAllowanceHoldings(
    allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingDim[]> {
    const { page, perPage } = allowanceHoldingsParamsDTO;

    const query = this.buildQuery(allowanceHoldingsParamsDTO, false);

    if (page && perPage) {
      const totalCount = await query.getCount();
      ResponseHeaders.setPagination(page, perPage, totalCount, req);
    }

    return query.getMany();
  }

  async getAllApplicableAllowanceHoldingsAttributes(): Promise<any> {
    const query = this.createQueryBuilder('ahd')
      .select([
        'ahd.vintageYear',
        'ahd.programCodeInfo',
        'af.accountNumber',
        'af.accountTypeCode',
        'af.facilityId',
        'af.stateCode',
        'aod.ownerOperator',
      ])
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
    return query.getMany();
  }

  private getColumns(isStreamed: boolean): string[] {
    const columns = [
      'ahd.accountNumber',
      'ahd.accountName',
      'ahd.programCodeInfo',
      'ahd.vintageYear',
      'ahd.totalBlock',
      'ahd.startBlock',
      'ahd.endBlock',
      'af.facilityId',
      'af.stateCode',
      'af.epaRegion',
      'af.ownerOperator',
      'af.accountType',
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
    params: AllowanceHoldingsParamsStreamDTO | AllowanceHoldingsParamsDTO,
    isStreamed: boolean = false,
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
