import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { AccountOwnerDim } from '../entities/account-owner-dim.entity';

@Injectable()
export class AccountOwnerDimRepository extends Repository<AccountOwnerDim> {
  constructor(entityManager: EntityManager) {
    super(AccountOwnerDim, entityManager);
  }

  async getAllOwnerOperators(): Promise<AccountOwnerDim[]> {
    const query = this.createQueryBuilder('aod')
      .select(['aod.ownerOperator', 'aod.ownType'])
      .where('aod.ownerOperator IS NOT NULL')
      .distinctOn(['aod.ownerOperator', 'aod.ownType'])
      .orderBy('aod.ownerOperator');
    return query.getMany();
  }
}
