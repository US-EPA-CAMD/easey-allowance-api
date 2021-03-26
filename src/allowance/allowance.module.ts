import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllowanceController } from './allowance.controller';
import { AllowanceService } from './allowance.service';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';

@Module({
  imports: [TypeOrmModule.forFeature([AllowanceHoldingDimRepository])],
  controllers: [AllowanceController],
  providers: [AllowanceHoldingsMap, AllowanceService],
})
export class AllowanceModule {}
