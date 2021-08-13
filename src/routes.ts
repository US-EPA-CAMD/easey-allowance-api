import { Routes } from 'nest-router';

import { AllowanceHoldingsModule } from './allowance-holdings/allowance-holdings.module';
import { AccountModule } from './account/account.module';
import { AllowanceTransactionsModule } from './allowance-transactions/allowance-transactions.module';

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
];

export default routes;
