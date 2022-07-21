import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniKitDashboardPage } from './mini-kit-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MiniKitDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniKitDashboardPageRoutingModule {}
