import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolarPostVerificationPage } from './solar-post-verification.page';

const routes: Routes = [
  {
    path: '',
    component: SolarPostVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolarPostVerificationPageRoutingModule {}
