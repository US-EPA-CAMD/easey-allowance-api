import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { ApplicableAllowanceHoldingsAttributesDTO } from '../dto/applicable-allowance-holdings-attributes.dto';

import { BaseMap } from '@us-epa-camd/easey-common/maps';

@Injectable()
export class ApplicableAllowanceHoldingsAttributesMap extends BaseMap<
  any,
  ApplicableAllowanceHoldingsAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    return {
      [propertyMetadata.vintageYear.fieldLabels.value]: entity.vintageYear,
      [propertyMetadata.programCode.fieldLabels.value]: entity.programCodeInfo,
      [propertyMetadata.accountNumber.fieldLabels.value]:
        entity.accountFact.accountNumber,
      [propertyMetadata.accountTypeCode.fieldLabels.value]:
        entity.accountFact.accountTypeCode,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.accountFact
        .facilityId
        ? Number(entity.accountFact.facilityId)
        : entity.accountFact.facilityId,
      [propertyMetadata.stateCode.fieldLabels.value]: entity.accountFact.stateCode,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        entity.accountFact.accountOwnerDim?.ownerOperator || null,
    };
  }
}
