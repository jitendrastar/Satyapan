import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemonstrationDashboardPage } from './demonstration-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DemonstrationDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemonstrationDashboardPageRoutingModule {}
