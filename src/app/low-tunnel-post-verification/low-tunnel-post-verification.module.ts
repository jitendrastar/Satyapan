import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LowTunnelPostVerificationPageRoutingModule } from './low-tunnel-post-verification-routing.module';

import { LowTunnelPostVerificationPage } from './low-tunnel-post-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LowTunnelPostVerificationPageRoutingModule
  ],
  declarations: [LowTunnelPostVerificationPage]
})
export class LowTunnelPostVerificationPageModule {}
