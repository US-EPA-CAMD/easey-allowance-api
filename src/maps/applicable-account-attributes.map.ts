import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { BaseMap } from './base.map';
import { ApplicableAccountAttributesDTO } from '../dto/applicable-account-attributes.dto';

@Injectable()
export class ApplicableAccountAttributesMap extends BaseMap<
  any,
  ApplicableAccountAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    return {
      [propertyMetadata.programCode.fieldLabels.value]: entity.programCodeInfo,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.facilityId
        ? Number(entity.facilityId)
        : entity.facilityId,
      [propertyMetadata.state.fieldLabels.value]: entity.state,
      [propertyMetadata.accountNumber.fieldLabels.value]: entity.accountNumber,
      [propertyMetadata.accountType.fieldLabels.value]: entity.accountType,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        entity.accountOwnerDim?.ownerOperator || null,
    };
  }
}
