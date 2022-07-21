import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniKitProductAllotmentModelPage } from './product-allotment-model.page';

const routes: Routes = [
  {
    path: '',
    component: MiniKitProductAllotmentModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductAllotmentModelPageRoutingModule {}
