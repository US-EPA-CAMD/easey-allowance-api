import { EntityRepository, Repository } from 'typeorm';

import { AllowanceHoldingDim } from '../entities/allowance-holding-dim.entity';
import { AllowanceHoldingsParamsDTO } from '../dto/allowance-holdings.params.dto';
import { QueryBuilderHelper } from '../utils/query-builder.helper';

@EntityRepository(AllowanceHoldingDim)
export class AllowanceHoldingDimRepository extends Repository<
  AllowanceHoldingDim
> {
  async getAllowanceHoldings(
    allowanceHoldingsParamsDTO: AllowanceHoldingsParamsDTO,
  ): Promise<AllowanceHoldingDim[]> {
    let query = this.createQueryBuilder('ahd')
      .select([
        'ahd.accountNumber',
        'ahd.accountName',
        'ahd.prgCode',
        'ahd.vintageYear',
        'ahd.totalBlock',
        'ahd.startBlock',
        'ahd.endBlock',
        'af.orisCode',
        'af.state',
        'af.epaRegion',
        'af.ownDisplay',
        'af.accountType',
      ])
      .innerJoin('ahd.accountFact', 'af');
    query = QueryBuilderHelper.createAllowanceQuery(
      query,
      allowanceHoldingsParamsDTO,
      ['vintageBeginYear', 'vintageEndYear'],
      'ahd',
      'af',
    );

    return query.getMany();
  }
}
