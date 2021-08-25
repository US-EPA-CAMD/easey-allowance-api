import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllowanceComplianceMap } from '../maps/allowance-compliance.map';
import { AccountComplianceDimRepository } from './account-compliance-dim.repository';
import { AllowanceComplianceController } from './allowance-compliance.controller';
import { AllowanceComplianceService } from './allowance-compliance.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountComplianceDimRepository])],
  controllers: [AllowanceComplianceController],
  providers: [AllowanceComplianceMap, AllowanceComplianceService],
})
export class AllowanceComplianceModule {}
