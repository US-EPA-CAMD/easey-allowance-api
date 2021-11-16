import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceController } from './allowance-compliance.controller';
import { AllowanceComplianceService } from './allowance-compliance.service';
import { OwnerYearDimRepository } from './owner-year-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { ApplicableAllowanceComplianceAttributesMap } from '../maps/applicable-allowance-compliance.map';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountComplianceDimRepository,
      OwnerYearDimRepository,
    ]),
    HttpModule,
  ],
  controllers: [AllowanceComplianceController],
  providers: [
    AllowanceComplianceMap,
    AllowanceComplianceService,
    OwnerOperatorsMap,
    ConfigService,
    ApplicableAllowanceComplianceAttributesMap,
  ],
})
export class AllowanceComplianceModule {}
