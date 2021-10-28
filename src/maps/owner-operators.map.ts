import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { BaseMap } from '@us-epa-camd/easey-common/maps';
import { OwnerOperatorsDTO } from '../dto/owner-operators.dto';

@Injectable()
export class OwnerOperatorsMap extends BaseMap<any, OwnerOperatorsDTO> {
  public async one(entity: any): Promise<any> {
    return {
      [propertyMetadata.ownerOperator.fieldLabels.value]: entity.ownerOperator,
      [propertyMetadata.ownType.fieldLabels.value]: entity.ownType,
    };
  }
}
