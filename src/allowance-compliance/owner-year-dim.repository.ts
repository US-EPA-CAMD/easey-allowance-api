import { Repository, EntityRepository } from 'typeorm';

import { OwnerYearDim } from '../entities/owner-year-dim.entity';

@EntityRepository(OwnerYearDim)
export class OwnerYearDimRepository extends Repository<OwnerYearDim> {
  async getAllOwnerOperators(): Promise<OwnerYearDim[]> {
    const query = this.createQueryBuilder('oyd')
      .select(['oyd.ownId', 'oyd.ownerOperator', 'oyd.ownType'])
      .distinctOn(['oyd.ownId', 'oyd.ownType'])
      .orderBy('oyd.ownId');
    return query.getMany();
  }
}
