import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MBSYDashboardPage } from './mbsy-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MBSYDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MBSYDashboardPageRoutingModule {}
