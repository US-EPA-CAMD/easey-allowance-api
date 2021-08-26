import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceController } from './allowance-compliance.controller';
import { AllowanceComplianceService } from './allowance-compliance.service';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountComplianceDimRepository,
      OwnerYearDimRepository,
    ]),
  ],
  controllers: [AllowanceComplianceController],
  providers: [
    AllowanceComplianceMap,
    AllowanceComplianceService,
    OwnerOperatorsMap,
  ],
})
export class AllowanceComplianceModule {}
