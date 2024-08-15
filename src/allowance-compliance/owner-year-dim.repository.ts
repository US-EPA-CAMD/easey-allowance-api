import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

import { OwnerYearDim } from '../entities/owner-year-dim.entity';

@Injectable()
export class OwnerYearDimRepository extends Repository<OwnerYearDim> {
  constructor(entityManager: EntityManager) {
    super(OwnerYearDim, entityManager);
  }

  async getAllOwnerOperators(): Promise<OwnerYearDim[]> {
    const query = this.createQueryBuilder('oyd')
      .select(['oyd.ownerOperator', 'oyd.ownType'])
      .where('oyd.ownerOperator IS NOT NULL')
      .distinctOn(['oyd.ownerOperator', 'oyd.ownType'])
      .orderBy('oyd.ownerOperator');
    return query.getMany();
  }
}
