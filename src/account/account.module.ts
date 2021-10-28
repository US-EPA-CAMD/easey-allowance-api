import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountFactRepository,
      AccountOwnerDimRepository,
    ]),
    HttpModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountMap, OwnerOperatorsMap, ConfigService],
})
export class AccountModule {}
