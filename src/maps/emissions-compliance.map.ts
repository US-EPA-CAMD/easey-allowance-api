import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-constants/lib';

import { BaseMap } from './base.map';
import { UnitComplianceDim } from '../entities/unit-compliance-dim.entity';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';

@Injectable()
export class EmissionsComplianceMap extends BaseMap<
  UnitComplianceDim,
  EmissionsComplianceDTO
> {
  public async one(entity: UnitComplianceDim): Promise<any> {
    const array = [
      entity.ownerDisplayFact.owner,
      entity.ownerDisplayFact.operator,
    ];
    const ownOprList = array
      .filter(e => e)
      .join(',')
      .slice(0, -1)
      .split('),');
    const ownOprUniqueList = [...new Set(ownOprList)];
    const ownerOperator = ownOprUniqueList.join('),');
    return {
      [propertyMetadata.year.fieldLabels.value]: Number(entity.year),
      [propertyMetadata.facilityName.fieldLabels.value]:
        entity.unitFact.facilityName,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.unitFact
        .facilityId
        ? Number(entity.unitFact.facilityId)
        : entity.unitFact.facilityId,
      [propertyMetadata.unitId.fieldLabels.value]: entity.unitFact.unitId,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        ownerOperator.length > 0 ? `${ownerOperator})` : null,
      [propertyMetadata.state.fieldLabels.value]: entity.unitFact.state,
      [propertyMetadata.complianceApproach.fieldLabels.value]:
        entity.complianceApproach,
      [propertyMetadata.avgPlanId.fieldLabels.value]: entity.avgPlanId
        ? Number(entity.avgPlanId)
        : entity.avgPlanId,
      [propertyMetadata.emissionsLimitDisplay.fieldLabels
        .value]: entity.emissionsLimitDisplay
        ? Number(entity.emissionsLimitDisplay)
        : entity.emissionsLimitDisplay,
      [propertyMetadata.actualEmissionsRate.fieldLabels
        .value]: entity.actualEmissionsRate
        ? Number(entity.actualEmissionsRate)
        : entity.actualEmissionsRate,
      [propertyMetadata.avgPlanActual.fieldLabels.value]: entity.avgPlanActual
        ? Number(entity.avgPlanActual)
        : entity.avgPlanActual,
      [propertyMetadata.inCompliance.fieldLabels.value]: entity.inCompliance,
    };
  }
}
