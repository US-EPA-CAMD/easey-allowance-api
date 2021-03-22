import { Routes } from 'nest-router';

import { AllowanceModule } from './allowance/allowance.module';

const routes: Routes = [
  {
    path: '/allowances',
    module: AllowanceModule,
  },
];

export default routes;
