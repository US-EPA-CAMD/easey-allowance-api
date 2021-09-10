import { Repository, EntityRepository } from 'typeorm';

import { AccountOwnerDim } from '../entities/account-owner-dim.entity';

@EntityRepository(AccountOwnerDim)
export class AccountOwnerDimRepository extends Repository<AccountOwnerDim> {
  async getAllOwnerOperators(): Promise<AccountOwnerDim[]> {
    const query = this.createQueryBuilder('aod')
      .select(['aod.ownerOperator', 'aod.ownType'])
      .where('aod.ownerOperator IS NOT NULL')
      .distinctOn(['aod.ownerOperator', 'aod.ownType'])
      .orderBy('aod.ownerOperator');
    return query.getMany();
  }
}
