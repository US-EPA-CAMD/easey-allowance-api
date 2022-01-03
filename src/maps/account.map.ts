import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';

import { BaseMap } from '@us-epa-camd/easey-common/maps';
import { AccountFact } from '../entities/account-fact.entity';

@Injectable()
export class AccountMap extends BaseMap<AccountFact, any> {
  public async one(entity: AccountFact): Promise<any> {
    let attributes = {};
    if (entity.programCodeInfo) {
      attributes = {
        [propertyMetadata.programCodeInfo.fieldLabels.value]: entity.programCodeInfo,
        [propertyMetadata.accountType.fieldLabels.value]: entity.accountType,
        [propertyMetadata.facilityId.fieldLabels.value]: entity.facilityId
          ? Number(entity.facilityId)
          : entity.facilityId,
        [propertyMetadata.unitId.fieldLabels.value]: entity.unitId,
        [propertyMetadata.ownerOperator.fieldLabels.value]: entity.ownerOperator,
        [propertyMetadata.stateCode.fieldLabels.value]: entity.stateCode,
        [propertyMetadata.epaRegion.fieldLabels.value]: entity.epaRegion
          ? Number(entity.epaRegion)
          : entity.epaRegion,
        [propertyMetadata.nercRegion.fieldLabels.value]: entity.nercRegion,
      };
    }
    return {
      [propertyMetadata.accountNumber.fieldLabels.value]: entity.accountNumber,
      [propertyMetadata.accountName.fieldLabels.value]: entity.accountName,
      ...attributes,
    };
  }
}
