import { Repository, EntityRepository } from 'typeorm';

import { TransactionOwnerDim } from '../entities/transaction-owner-dim.entity';

@EntityRepository(TransactionOwnerDim)
export class TransactionOwnerDimRepository extends Repository<
  TransactionOwnerDim
> {
  async getAllOwnerOperators(): Promise<TransactionOwnerDim[]> {
    const query = this.createQueryBuilder('tod')
      .select(['tod.ownerOperator', 'tod.ownType'])
      .where('tod.ownerOperator IS NOT NULL')
      .distinctOn(['tod.ownerOperator', 'tod.ownType'])
      .orderBy('tod.ownerOperator');
    return query.getMany();
  }
}
