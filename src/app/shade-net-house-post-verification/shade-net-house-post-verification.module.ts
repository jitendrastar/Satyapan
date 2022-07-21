import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShadeNetHousePostVerificationPageRoutingModule } from './shade-net-house-post-verification-routing.module';

import { ShadeNetHousePostVerificationPage } from './shade-net-house-post-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShadeNetHousePostVerificationPageRoutingModule
  ],
  declarations: [ShadeNetHousePostVerificationPage]
})
export class ShadeNetHousePostVerificationPageModule {}
