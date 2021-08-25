import { Injectable } from '@nestjs/common';

import { BaseMap } from './base.map';
import { AccountComplianceDim } from '../entities/account-compliance-dim.entity';
import { AllowanceComplianceDTO } from '../dto/allowance-compliance.dto';

@Injectable()
export class AllowanceComplianceMap extends BaseMap<
  AccountComplianceDim,
  AllowanceComplianceDTO
> {
  public async one(
    entity: AccountComplianceDim,
  ): Promise<AllowanceComplianceDTO> {
    return {
      programCodeInfo: entity.prgCode,
      year: entity.year ? Number(entity.year) : entity.year,
      accountNumber: entity.accountNumber,
      accountName: entity.accountFact.accountName,
      facilityName: entity.accountFact.facilityName,
      facilityId: entity.accountFact.orisCode
        ? Number(entity.accountFact.orisCode)
        : entity.accountFact.orisCode,
      unitsAffected: entity.unitsAffected,
      allocated: entity.allocated ? Number(entity.allocated) : entity.allocated,
      bankedHeld: entity.bankedHeld
        ? Number(entity.bankedHeld)
        : entity.bankedHeld,
      currentHeld: entity.currentHeld
        ? Number(entity.currentHeld)
        : entity.currentHeld,
      totalAllowancesHeld: entity.totalAllowancesHeld
        ? Number(entity.totalAllowancesHeld)
        : entity.totalAllowancesHeld,
      complianceYearEmissions: entity.complianceYearEmissions
        ? Number(entity.complianceYearEmissions)
        : entity.complianceYearEmissions,
      otherDeductions: entity.otherDeductions
        ? Number(entity.otherDeductions)
        : entity.otherDeductions,
      totalRequiredDeductions: entity.totalRequiredDeductions
        ? Number(entity.totalRequiredDeductions)
        : entity.totalRequiredDeductions,
      currentDeductions: entity.currentDeductions
        ? Number(entity.currentDeductions)
        : entity.currentDeductions,
      deductOneToOne: entity.deductOneToOne
        ? Number(entity.deductOneToOne)
        : entity.deductOneToOne,
      deductTwoToOne: entity.deductTwoToOne
        ? Number(entity.deductTwoToOne)
        : entity.deductTwoToOne,
      totalAllowancesDeducted: entity.totalAllowancesDeducted
        ? Number(entity.totalAllowancesDeducted)
        : entity.totalAllowancesDeducted,
      carriedOver: entity.carriedOver
        ? Number(entity.carriedOver)
        : entity.carriedOver,
      excessEmissions: entity.excessEmissions
        ? Number(entity.excessEmissions)
        : entity.excessEmissions,
      ownerOperator: entity.accountFact.ownDisplay,
      state: entity.accountFact.state,
    };
  }
}
