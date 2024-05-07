import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { TransactionOwnerDim } from '../entities/transaction-owner-dim.entity';

@Injectable()
export class TransactionOwnerDimRepository extends Repository<
  TransactionOwnerDim
> {
  constructor(entityManager: EntityManager) {
    super(TransactionOwnerDim, entityManager);
  }

  async getAllOwnerOperators(): Promise<TransactionOwnerDim[]> {
    const query = this.createQueryBuilder('tod')
      .select(['tod.ownerOperator', 'tod.ownType'])
      .where('tod.ownerOperator IS NOT NULL')
      .distinctOn(['tod.ownerOperator', 'tod.ownType'])
      .orderBy('tod.ownerOperator');
    return query.getMany();
  }
}
