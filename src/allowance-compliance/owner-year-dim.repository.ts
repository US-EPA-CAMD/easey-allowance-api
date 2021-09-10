import { Repository, EntityRepository } from 'typeorm';

import { OwnerYearDim } from '../entities/owner-year-dim.entity';

@EntityRepository(OwnerYearDim)
export class OwnerYearDimRepository extends Repository<OwnerYearDim> {
  async getAllOwnerOperators(): Promise<OwnerYearDim[]> {
    const query = this.createQueryBuilder('oyd')
      .select(['oyd.ownerOperator', 'oyd.ownType'])
      .where('oyd.ownerOperator IS NOT NULL')
      .distinctOn(['oyd.ownerOperator', 'oyd.ownType'])
      .orderBy('oyd.ownerOperator');
    return query.getMany();
  }
}
