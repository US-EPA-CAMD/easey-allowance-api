import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllowanceHoldingsController } from './allowance-holdings.controller';
import { AllowanceHoldingsService } from './allowance-holdings.service';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';

@Module({
  imports: [TypeOrmModule.forFeature([AllowanceHoldingDimRepository])],
  controllers: [AllowanceHoldingsController],
  providers: [AllowanceHoldingsMap, AllowanceHoldingsService],
})
export class AllowanceHoldingsModule {}
