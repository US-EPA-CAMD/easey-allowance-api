import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-common/constants';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { ApplicableAllowanceComplianceAttributesDTO } from '../dto/applicable-allowance-compliance-attributes.dto';

@Injectable()
export class ApplicableAllowanceComplianceAttributesMap extends BaseMap<
  any,
  ApplicableAllowanceComplianceAttributesDTO
> {
  public async one(entity: any): Promise<any> {
    return {
      [propertyMetadata.year.fieldLabels.value]: entity.acd_op_year,
      [propertyMetadata.programCode.fieldLabels.value]: entity.af_prg_code,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.af_orispl_code
        ? Number(entity.af_orispl_code)
        : entity.af_orispl_code,
      [propertyMetadata.stateCode.fieldLabels.value]: entity.af_state,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        entity?.aod_own_display || null,
    };
  }
}
