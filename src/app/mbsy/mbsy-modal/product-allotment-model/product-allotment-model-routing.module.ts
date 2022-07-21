import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MbsyProductAllotmentModelPage } from './product-allotment-model.page';

const routes: Routes = [
  {
    path: '',
    component: MbsyProductAllotmentModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAllotmentModelPageRoutingModule {}
