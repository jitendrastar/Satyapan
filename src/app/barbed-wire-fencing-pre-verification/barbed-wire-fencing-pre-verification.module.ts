import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarbedWireFencingPreVerificationPageRoutingModule } from './barbed-wire-fencing-pre-verification-routing.module';

import { BarbedWireFencingPreVerificationPage } from './barbed-wire-fencing-pre-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarbedWireFencingPreVerificationPageRoutingModule
  ],
  declarations: [BarbedWireFencingPreVerificationPage]
})
export class BarbedWireFencingPreVerificationPageModule {}
