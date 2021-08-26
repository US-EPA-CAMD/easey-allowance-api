import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import routes from './routes';
import dbConfig from './config/db.config';
import appConfig from './config/app.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AllowanceHoldingsModule } from './allowance-holdings/allowance-holdings.module';
import { AccountModule } from './account/account.module';
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
    AllowanceHoldingsModule,
    AllowanceTransactionsModule,
    AccountModule,
    AllowanceComplianceModule,
    EmissionsComplianceModule,
  ],
})
export class AppModule {}
