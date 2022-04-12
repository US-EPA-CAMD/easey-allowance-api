import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionBlockDimRepository } from './transaction-block-dim.repository';
import { AllowanceTransactionsController } from './allowance-transactions.controller';
import { AllowanceTransactionsMap } from '../maps/allowance-transactions.map';
import { AllowanceTransactionsService } from './allowance-transactions.service';
import { TransactionOwnerDimRepository } from './transaction-owner-dim.repository';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StreamModule } from '@us-epa-camd/easey-common/stream';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionBlockDimRepository,
      TransactionOwnerDimRepository,
    ]),
    HttpModule,
    StreamModule,
  ],
  controllers: [AllowanceTransactionsController],
  providers: [
    AllowanceTransactionsService,
    AllowanceTransactionsMap,
    OwnerOperatorsMap,
    ConfigService,
  ],
})
export class AllowanceTransactionsModule {}
