import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountFactRepository } from './account-fact.repository';
import { AccountOwnerDimRepository } from './account-owner-dim.repository';
import { AccountMap } from '../maps/account.map';
import { OwnerOperatorsMap } from '../maps/owner-operators.map';
import { ApplicableAccountAttributesMap } from '../maps/applicable-account-attributes.map';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountFactRepository,
      AccountOwnerDimRepository,
    ]),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountMap,
    ApplicableAccountAttributesMap,
    OwnerOperatorsMap,
  ],
})
export class AccountModule {}
