import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolyHousePostVerificationPageRoutingModule } from './poly-house-post-verification-routing.module';

import { PolyHousePostVerificationPage } from './poly-house-post-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolyHousePostVerificationPageRoutingModule
  ],
  declarations: [PolyHousePostVerificationPage]
})
export class PolyHousePostVerificationPageModule {}
