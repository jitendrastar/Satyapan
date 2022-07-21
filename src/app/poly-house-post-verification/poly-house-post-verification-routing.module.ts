import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolyHousePostVerificationPage } from './poly-house-post-verification.page';

const routes: Routes = [
  {
    path: '',
    component: PolyHousePostVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolyHousePostVerificationPageRoutingModule {}
