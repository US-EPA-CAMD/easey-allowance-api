import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { ApplicableComplianceAttributesDTO } from '../dto/applicable-compliance-attributes.dto';

@Injectable()
export class ApplicableEmissionsComplianceAttributesMap extends BaseMap<
  any,
  ApplicableComplianceAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    return {
      [propertyMetadata.year.fieldLabels.value]: entity.year,
      [propertyMetadata.programCode.fieldLabels.value]:
        entity.unitFact.programCodeInfo,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.unitFact
        .facilityId
        ? Number(entity.unitFact.facilityId)
        : entity.unitFact.facilityId,
      [propertyMetadata.stateCode.fieldLabels.value]: entity.unitFact.stateCode,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        entity.unitFact.ownerYearDim?.ownerOperator || null,
    };
  }
}
