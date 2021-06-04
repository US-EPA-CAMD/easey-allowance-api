import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountFactRepository } from './account-fact.repository';
import { AccountMap } from '../maps/account.map';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountFactRepository])],
  controllers: [AccountController],
  providers: [AccountMap, AccountService],
})
export class AccountModule {}
