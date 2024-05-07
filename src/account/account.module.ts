import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountFactRepository,
      AccountOwnerDimRepository,
    ]),
    LoggerModule,
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountMap,
    OwnerOperatorsMap,
    AccountFactRepository,
    AccountOwnerDimRepository,
  ],
})
export class AccountModule {}
