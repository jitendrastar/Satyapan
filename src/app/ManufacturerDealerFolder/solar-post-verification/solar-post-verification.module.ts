import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolarPostVerificationPageRoutingModule } from './solar-post-verification-routing.module';

import { SolarPostVerificationPage } from './solar-post-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolarPostVerificationPageRoutingModule
  ],
  declarations: [SolarPostVerificationPage]
})
export class SolarPostVerificationPageModule {}
