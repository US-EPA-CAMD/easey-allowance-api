import { Repository, EntityRepository } from 'typeorm';

import { AccountOwnerDim } from '../entities/account-owner-dim.entity';

@EntityRepository(AccountOwnerDim)
export class AccountOwnerDimRepository extends Repository<AccountOwnerDim> {
  async getAllOwnerOperators(): Promise<AccountOwnerDim[]> {
    const query = this.createQueryBuilder('aod')
      .select(['aod.ownId', 'aod.ownerOperator', 'aod.ownType'])
      .distinctOn(['aod.ownId', 'aod.ownType'])
      .orderBy('aod.ownId');
    return query.getMany();
  }
}
