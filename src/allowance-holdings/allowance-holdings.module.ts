import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllowanceHoldingsController } from './allowance-holdings.controller';
import { AllowanceHoldingsService } from './allowance-holdings.service';
import { AccountService } from '../account/account.service';
import { AllowanceHoldingDimRepository } from './allowance-holding-dim.repository';
import { AccountOwnerDimRepository } from '../account/account-owner-dim.repository';
import { AccountFactRepository } from '../account/account-fact.repository';
import { AllowanceHoldingsMap } from '../maps/allowance-holdings.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountMap } from '../maps/account.map';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AllowanceHoldingDimRepository,
      AccountOwnerDimRepository,
      AccountFactRepository,
    ]),
    HttpModule,
  ],
  controllers: [AllowanceHoldingsController],
  providers: [
    AllowanceHoldingDimRepository,
    AccountOwnerDimRepository,
    AccountFactRepository,
    AllowanceHoldingsService,
    AccountService,
    AllowanceHoldingsMap,
    AccountMap,
    OwnerOperatorsMap,
    ConfigService,
  ],
})
export class AllowanceHoldingsModule {}
