import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmissionsComplianceController } from './emissions-compliance.controller';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from '../allowance-compliance/account-compliance-dim.repository';
import { OwnerYearDimRepository } from '../allowance-compliance/owner-year-dim.repository';
import { UnitComplianceDimRepository } from './unit-compliance-dim.repository';
import { EmissionsComplianceService } from './emissions-compliance.service';
import { EmissionsComplianceMap } from '../maps/emissions-compliance.map';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';
import { ApplicableEmissionsComplianceAttributesMap } from '../maps/applicable-emissions-compliance-map';

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
    AllowanceComplianceService,
    EmissionsComplianceService,
    AllowanceComplianceMap,
    OwnerOperatorsMap,
    EmissionsComplianceMap,
    ApplicableAllowanceComplianceAttributesMap,
    ApplicableEmissionsComplianceAttributesMap,
  ],
})
export class EmissionsComplianceModule {}
