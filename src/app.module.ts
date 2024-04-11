import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dbConfig } from '@us-epa-camd/easey-common/config';
import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { CorsOptionsModule } from '@us-epa-camd/easey-common/cors-options';

import {
  IsAccountTypeValidator,
  IsAllowanceProgramValidator,
  IsStateCodeValidator,
  IsTransactionTypeValidator,
} from './validators';
import routes from './routes';
import appConfig from './config/app.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AccountModule } from './account/account.module';
import { AllowanceHoldingsModule } from './allowance-holdings/allowance-holdings.module';
import { AllowanceTransactionsModule } from './allowance-transactions/allowance-transactions.module';
import { AllowanceComplianceModule } from './allowance-compliance/allowance-compliance.module';
import { EmissionsComplianceModule } from './emissions-compliance/emissions-compliance.module';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    LoggerModule,
    CorsOptionsModule,
    AllowanceHoldingsModule,
    AllowanceTransactionsModule,
    AccountModule,
    AllowanceComplianceModule,
    EmissionsComplianceModule,
  ],
  providers: [
    IsAccountTypeValidator,
    IsAllowanceProgramValidator,
    IsStateCodeValidator,
    IsTransactionTypeValidator,
  ],
})
export class AppModule {}
