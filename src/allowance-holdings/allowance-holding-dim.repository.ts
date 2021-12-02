import { EntityRepository, Repository } from 'typeorm';
import { Request } from 'express';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { QueryBuilderHelper } from '../utils/query-builder.helper';

@EntityRepository(AllowanceHoldingDim)
export class AllowanceHoldingDimRepository extends Repository<
  AllowanceHoldingDim
> {
  async getAllowanceHoldings(
    allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
    req: Request,
  ): Promise<AllowanceHoldingDim[]> {
    const { page, perPage } = allowanceHoldingsParamsDTO;
    let query = this.createQueryBuilder('ahd')
      .select([
        'ahd.accountNumber',
        'ahd.accountName',
        'ahd.programCodeInfo',
        'ahd.vintageYear',
        'ahd.totalBlock',
        'ahd.startBlock',
        'ahd.endBlock',
        'af.facilityId',
        'af.state',
        'af.epaRegion',
        'af.ownerOperator',
        'af.accountType',
      ])
      .innerJoin('ahd.accountFact', 'af');
    query = QueryBuilderHelper.createAccountQuery(
      query,
      allowanceHoldingsParamsDTO,
      [
        'vintageYear',
        'accountNumber',
        'facilityId',
        'ownerOperator',
        'state',
        'programCodeInfo',
        'accountType',
      ],
      'ahd',
      'af',
      false,
    );

    query
      .orderBy('ahd.programCodeInfo')
      .addOrderBy('ahd.accountNumber')
      .addOrderBy('ahd.vintageYear')
      .addOrderBy('ahd.startBlock');

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
        'af.state',
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
        'af.state',
        'aod.own_display',
      ]);
    return query.getMany();
  }
}
