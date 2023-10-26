import { Injectable } from '@nestjs/common';

import { BaseMap } from '@us-epa-camd/easey-common/maps';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';

@Injectable()
export class AllowanceComplianceMap extends BaseMap<
  AccountComplianceDim,
  AllowanceComplianceDTO
> {
  public async one(entity: AccountComplianceDim): Promise<any> {
    return {
      programCodeInfo: entity.programCodeInfo,
      year: entity.year,
      accountNumber: entity.accountNumber,
      accountName: entity.accountFact.accountName,
      facilityName: entity.accountFact.facilityName,
      facilityId: entity.accountFact.facilityId,
      unitsAffected: entity.unitsAffected,
      allocated: entity.allocated,
      bankedHeld: entity.bankedHeld,
      currentHeld: entity.currentHeld,
      totalAllowancesHeld: entity.totalAllowancesHeld,
      complianceYearEmissions: entity.complianceYearEmissions,
      otherDeductions: entity.otherDeductions,
      totalRequiredDeductions: entity.totalRequiredDeductions,
      currentDeductions: entity.currentDeductions,
      deductOneToOne: entity.deductOneToOne,
      deductTwoToOne: entity.deductTwoToOne,
      totalAllowancesDeducted: entity.totalAllowancesDeducted,
      carriedOver: entity.carriedOver,
      excessEmissions: entity.excessEmissions,
      ownerOperator: entity.accountFact.ownerOperator.replace(",", "|"),
      stateCode: entity.accountFact.stateCode,
    };
  }
}
