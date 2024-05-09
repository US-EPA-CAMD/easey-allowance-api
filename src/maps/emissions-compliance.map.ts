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
    const splitOwnWithPipe = entity.ownerDisplayFact?.owner?.split('|');
    const splitOprWithPipe = entity.ownerDisplayFact?.operator?.split('|');

    const uniqueOwn = [...new Set(splitOwnWithPipe)].join('|');
    const uniqueOpr = [...new Set(splitOprWithPipe)].join('|');

    const uniqueOwnOprList = [uniqueOwn, uniqueOpr];
    const ownerOperator = uniqueOwnOprList.filter(e => e).join('|');

    return {
      year: entity.year,
      facilityName: entity.unitFact?.facilityName || null,
      facilityId: entity.unitFact?.facilityId,
      unitId: entity.unitFact?.unitId || null,
      ownerOperator: ownerOperator.length > 0 ? `${ownerOperator}` : null,
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
