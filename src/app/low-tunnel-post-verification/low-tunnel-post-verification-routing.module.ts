import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LowTunnelPostVerificationPage } from './low-tunnel-post-verification.page';

const routes: Routes = [
  {
    path: '',
    component: LowTunnelPostVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LowTunnelPostVerificationPageRoutingModule {}
