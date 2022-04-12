import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { StreamModule } from '@us-epa-camd/easey-common/stream';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountFactRepository,
      AccountOwnerDimRepository,
    ]),
    LoggerModule,
    StreamModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountMap, OwnerOperatorsMap],
})
export class AccountModule {}
