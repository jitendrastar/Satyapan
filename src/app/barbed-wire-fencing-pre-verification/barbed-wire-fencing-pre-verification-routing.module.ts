import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarbedWireFencingPreVerificationPage } from './barbed-wire-fencing-pre-verification.page';

const routes: Routes = [
  {
    path: '',
    component: BarbedWireFencingPreVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbedWireFencingPreVerificationPageRoutingModule {}
