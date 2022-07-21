import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductAllotmentModelPage } from './product-allotment-model.page';

const routes: Routes = [
  {
    path: '',
    component: ProductAllotmentModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAllotmentModelPageRoutingModule {}
