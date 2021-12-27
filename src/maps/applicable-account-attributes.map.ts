import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

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
      [propertyMetadata.stateCode.fieldLabels.value]: entity.stateCode,
      [propertyMetadata.accountNumber.fieldLabels.value]: entity.accountNumber,
      [propertyMetadata.accountTypeCode.fieldLabels.value]:
        entity.accountTypeCode,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        entity.accountOwnerDim?.ownerOperator || null,
    };
  }
}
