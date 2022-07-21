import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhsPreVerificationPageRoutingModule } from './whs-pre-verification-routing.module';

import { WhsPreVerificationPage } from './whs-pre-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhsPreVerificationPageRoutingModule
  ],
  declarations: [WhsPreVerificationPage]
})
export class WhsPreVerificationPageModule {}
