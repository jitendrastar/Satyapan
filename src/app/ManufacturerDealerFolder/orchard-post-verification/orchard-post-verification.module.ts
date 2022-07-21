import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrchardPostVerificationPageRoutingModule } from './orchard-post-verification-routing.module';

import { OrchardPostVerificationPage } from './orchard-post-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrchardPostVerificationPageRoutingModule
  ],
  declarations: [OrchardPostVerificationPage]
})
export class OrchardPostVerificationPageModule {}
