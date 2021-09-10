import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { UnitComplianceDim } from '../entities/unit-compliance-dim.entity';
import { EmissionsComplianceDTO } from '../dto/emissions-compliance.dto';

@Injectable()
export class EmissionsComplianceMap extends BaseMap<
  UnitComplianceDim,
  EmissionsComplianceDTO
> {
  public async one(entity: UnitComplianceDim): Promise<EmissionsComplianceDTO> {
    let ownerOperator;
    let array = [
      entity.ownerDisplayFact.ownDisplay,
      entity.ownerDisplayFact.oprDisplay,
    ];
    const ownOprList = array
      .filter(e => e)
      .join(',')
      .slice(0, -1)
      .split('),');
    const ownOprUniqueList = [...new Set(ownOprList)];
    ownerOperator = ownOprUniqueList.join('),');
    return {
      year: entity.year,
      facilityName: entity.unitFact.facilityName,
      facilityId: entity.unitFact.orisCode
        ? Number(entity.unitFact.orisCode)
        : entity.unitFact.orisCode,
      unitId: entity.unitFact.unitId,
      ownerOperator: ownerOperator.length > 0 ? `${ownerOperator})` : null,
      state: entity.unitFact.state,
      complianceApproach: entity.complianceApproach,
      avgPlanId: entity.avgPlanId ? Number(entity.avgPlanId) : entity.avgPlanId,
      emissionsLimitDisplay: entity.emissionsLimitDisplay
        ? Number(entity.emissionsLimitDisplay)
        : entity.emissionsLimitDisplay,
      actualEmissionsRate: entity.actualEmissionsRate
        ? Number(entity.actualEmissionsRate)
        : entity.actualEmissionsRate,
      avgPlanActual: entity.avgPlanActual
        ? Number(entity.avgPlanActual)
        : entity.avgPlanActual,
      inCompliance: entity.inCompliance,
    };
  }
}
