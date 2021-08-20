import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

@Injectable()
export class OwnerOperatorsMap extends BaseMap<any, OwnerOperatorsDTO> {
  public async one(entity: any): Promise<OwnerOperatorsDTO> {
    return {
      ownId: Number(entity.ownId),
      ownerOperator: entity.ownerOperator,
      ownType: entity.ownType,
    };
  }
}
