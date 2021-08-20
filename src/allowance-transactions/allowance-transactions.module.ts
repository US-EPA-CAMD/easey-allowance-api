import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { AllowanceTransactionsController } from './allowance-transactions.controller';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { AllowanceTransactionsService } from './allowance-transactions.service';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionBlockDimRepository,
      TransactionOwnerDimRepository,
    ]),
  ],
  controllers: [AllowanceTransactionsController],
  providers: [
    AllowanceTransactionsService,
    AllowanceTransactionsMap,
    OwnerOperatorsMap,
  ],
})
export class AllowanceTransactionsModule {}
