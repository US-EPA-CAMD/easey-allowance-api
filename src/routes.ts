import { Routes } from 'nest-router';

import { AllowanceHoldingsModule } from './allowance-holdings/allowance-holdings.module';
import { AccountModule } from './account/account.module';
import { AllowanceTransactionsModule } from './allowance-transactions/allowance-transactions.module';
import { AllowanceComplianceModule } from './allowance-compliance/allowance-compliance.module';
import { EmissionsComplianceModule } from './emissions-compliance/emissions-compliance.module';

const routes: Routes = [
  {
    path: '/allowance-holdings',
    module: AllowanceHoldingsModule,
  },
  {
    path: '/accounts',
    module: AccountModule,
  },
  {
    path: '/allowance-transactions',
    module: AllowanceTransactionsModule,
  },
  {
    path: '/allowance-compliance',
    module: AllowanceComplianceModule,
  },
  {
    path: '/emissions-compliance',
    module: EmissionsComplianceModule,
  },
];

export default routes;
