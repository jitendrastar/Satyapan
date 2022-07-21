import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlasticMulchPostVerificationPageRoutingModule } from './plastic-mulch-post-verification-routing.module';

import { PlasticMulchPostVerificationPage } from './plastic-mulch-post-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlasticMulchPostVerificationPageRoutingModule
  ],
  declarations: [PlasticMulchPostVerificationPage]
})
export class PlasticMulchPostVerificationPageModule {}
