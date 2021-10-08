import { Injectable } from '@nestjs/common';
import { propertyMetadata } from '@us-epa-camd/easey-constants/lib';

import { BaseMap } from './base.map';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';

@Injectable()
export class AllowanceComplianceMap extends BaseMap<
  AccountComplianceDim,
  AllowanceComplianceDTO
> {
  public async one(entity: AccountComplianceDim): Promise<any> {
    return {
      [propertyMetadata.programCodeInfo.fieldLabels.value]:
        entity.programCodeInfo,
      [propertyMetadata.year.fieldLabels.value]: Number(entity.year),
      [propertyMetadata.accountNumber.fieldLabels.value]: entity.accountNumber,
      [propertyMetadata.accountName.fieldLabels.value]:
        entity.accountFact.accountName,
      [propertyMetadata.facilityName.fieldLabels.value]:
        entity.accountFact.facilityName,
      [propertyMetadata.facilityId.fieldLabels.value]: entity.accountFact
        .facilityId
        ? Number(entity.accountFact.facilityId)
        : entity.accountFact.facilityId,
      [propertyMetadata.unitsAffected.fieldLabels.value]: entity.unitsAffected,
      [propertyMetadata.allocated.fieldLabels.value]: entity.allocated
        ? Number(entity.allocated)
        : entity.allocated,
      [propertyMetadata.bankedHeld.fieldLabels.value]: entity.bankedHeld
        ? Number(entity.bankedHeld)
        : entity.bankedHeld,
      [propertyMetadata.currentHeld.fieldLabels.value]: entity.currentHeld
        ? Number(entity.currentHeld)
        : entity.currentHeld,
      [propertyMetadata.totalAllowancesHeld.fieldLabels
        .value]: entity.totalAllowancesHeld
        ? Number(entity.totalAllowancesHeld)
        : entity.totalAllowancesHeld,
      [propertyMetadata.complianceYearEmissions.fieldLabels
        .value]: entity.complianceYearEmissions
        ? Number(entity.complianceYearEmissions)
        : entity.complianceYearEmissions,
      [propertyMetadata.otherDeductions.fieldLabels
        .value]: entity.otherDeductions
        ? Number(entity.otherDeductions)
        : entity.otherDeductions,
      [propertyMetadata.totalRequiredDeductions.fieldLabels
        .value]: entity.totalRequiredDeductions
        ? Number(entity.totalRequiredDeductions)
        : entity.totalRequiredDeductions,
      [propertyMetadata.currentDeductions.fieldLabels
        .value]: entity.currentDeductions
        ? Number(entity.currentDeductions)
        : entity.currentDeductions,
      [propertyMetadata.deductOneToOne.fieldLabels.value]: entity.deductOneToOne
        ? Number(entity.deductOneToOne)
        : entity.deductOneToOne,
      [propertyMetadata.deductTwoToOne.fieldLabels.value]: entity.deductTwoToOne
        ? Number(entity.deductTwoToOne)
        : entity.deductTwoToOne,
      [propertyMetadata.totalAllowancesDeducted.fieldLabels
        .value]: entity.totalAllowancesDeducted
        ? Number(entity.totalAllowancesDeducted)
        : entity.totalAllowancesDeducted,
      [propertyMetadata.carriedOver.fieldLabels.value]: entity.carriedOver
        ? Number(entity.carriedOver)
        : entity.carriedOver,
      [propertyMetadata.excessEmissions.fieldLabels
        .value]: entity.excessEmissions
        ? Number(entity.excessEmissions)
        : entity.excessEmissions,
      [propertyMetadata.ownerOperator.fieldLabels.value]:
        entity.accountFact.ownerOperator,
      [propertyMetadata.state.fieldLabels.value]: entity.accountFact.state,
    };
  }
}
