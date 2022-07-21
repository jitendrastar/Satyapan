import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MbsyFarmerListPage } from './mbsy-farmer-list.page';

const routes: Routes = [
  {
    path: '',
    component: MbsyFarmerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MbsyFarmerListPageRoutingModule {}
