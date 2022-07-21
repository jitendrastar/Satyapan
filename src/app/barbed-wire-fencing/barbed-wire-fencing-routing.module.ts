import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarbedWireFencingPage } from './barbed-wire-fencing.page';

const routes: Routes = [
  {
    path: '',
    component: BarbedWireFencingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbedWireFencingPageRoutingModule {}
