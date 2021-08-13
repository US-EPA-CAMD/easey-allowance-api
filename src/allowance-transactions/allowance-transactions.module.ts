import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { AllowanceTransactionsController } from './allowance-transactions.controller';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { AllowanceTransactionsService } from './allowance-transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionBlockDimRepository])],
  controllers: [AllowanceTransactionsController],
  providers: [AllowanceTransactionsMap, AllowanceTransactionsService],
})
export class AllowanceTransactionsModule {}
