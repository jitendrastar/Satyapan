import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadeNetHousePostVerificationPage } from './shade-net-house-post-verification.page';

const routes: Routes = [
  {
    path: '',
    component: ShadeNetHousePostVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShadeNetHousePostVerificationPageRoutingModule {}
