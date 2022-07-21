import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFarmerModelPage } from './add-farmer-model.page';

const routes: Routes = [
  {
    path: '',
    component: AddFarmerModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFarmerModelPageRoutingModule {}
