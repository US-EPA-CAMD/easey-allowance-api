import { Routes } from 'nest-router';

import { AllowanceModule } from './allowance/allowance.module';
import { AccountModule } from './account/account.module';

const routes: Routes = [
  {
    path: '/allowances',
    module: AllowanceModule,
  },
  {
    path: '/accounts',
    module: AccountModule,
  },
];

export default routes;
