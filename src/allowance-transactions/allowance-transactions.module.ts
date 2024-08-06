import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AllowanceTransactionsController } from './allowance-transactions.controller';
import { AllowanceTransactionsService } from './allowance-transactions.service';
import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionBlockDimRepository,
      TransactionOwnerDimRepository,
    ]),
    HttpModule,
  ],
  controllers: [AllowanceTransactionsController],
  providers: [
    AllowanceTransactionsService,
    AllowanceTransactionsMap,
    OwnerOperatorsMap,
    ConfigService,
    TransactionBlockDimRepository,
    TransactionOwnerDimRepository,
  ],
})
export class AllowanceTransactionsModule {}
