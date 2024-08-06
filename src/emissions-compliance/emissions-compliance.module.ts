import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountComplianceDimRepository } from '../allowance-compliance/account-compliance-dim.repository';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { OwnerYearDimRepository } from '../allowance-compliance/owner-year-dim.repository';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { EmissionsComplianceController } from './emissions-compliance.controller';
import { EmissionsComplianceService } from './emissions-compliance.service';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountComplianceDimRepository,
      OwnerYearDimRepository,
      UnitComplianceDimRepository,
    ]),
  ],
  controllers: [EmissionsComplianceController],
  providers: [
    AccountComplianceDimRepository,
    AllowanceComplianceMap,
    AllowanceComplianceService,
    ApplicableAllowanceComplianceAttributesMap,
    EmissionsComplianceMap,
    EmissionsComplianceService,
    OwnerOperatorsMap,
    OwnerYearDimRepository,
    UnitComplianceDimRepository,
  ],
})
export class EmissionsComplianceModule {}
