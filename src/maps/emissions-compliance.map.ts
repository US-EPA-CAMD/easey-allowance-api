import { Injectable } from '@nestjs/common';
import { BaseMap } from '@us-epa-camd/easey-common/maps';

import { UnitComplianceDim } from '../entities/unit-compliance-dim.entity';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';

@Injectable()
export class EmissionsComplianceMap extends BaseMap<
  UnitComplianceDim,
  EmissionsComplianceDTO
> {
  public async one(entity: UnitComplianceDim): Promise<any> {
    const array = entity.ownerDisplayFact
      ? [entity.ownerDisplayFact.owner, entity.ownerDisplayFact.operator]
      : [];
    const ownOprList = array
      .filter(e => e)
      .join(',')
      .slice(0, -1)
      .split('),');
    const ownOprUniqueList = [...new Set(ownOprList)];
    const ownerOperator = ownOprUniqueList.join(')|');
    return {
      year: entity.year,
      facilityName: entity.unitFact?.facilityName || null,
      facilityId: entity.unitFact?.facilityId,
      unitId: entity.unitFact?.unitId || null,
      ownerOperator: ownerOperator.length > 0 ? `${ownerOperator})` : null,
      stateCode: entity.unitFact?.stateCode || null,
      complianceApproach: entity.complianceApproach,
      avgPlanId: entity.avgPlanId,
      emissionsLimitDisplay: entity.emissionsLimitDisplay,
      actualEmissionsRate: entity.actualEmissionsRate,
      avgPlanActual: entity.avgPlanActual,
      inCompliance: entity.inCompliance,
    };
  }
}
