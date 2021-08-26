import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmissionsComplianceController } from './emissions-compliance.controller';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceComplianceService } from '../allowance-compliance/allowance-compliance.service';
import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from '../allowance-compliance/account-compliance-dim.repository';
import { OwnerYearDimRepository } from '../allowance-compliance/owner-year-dim.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountComplianceDimRepository,
      OwnerYearDimRepository,
    ]),
  ],
  controllers: [EmissionsComplianceController],
  providers: [
    AllowanceComplianceService,
    AllowanceComplianceMap,
    OwnerOperatorsMap,
  ],
})
export class EmissionsComplianceModule {}
