import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductAllotmentModelPageRoutingModule } from './product-allotment-model-routing.module';

import { MiniKitProductAllotmentModelPage } from './product-allotment-model.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductAllotmentModelPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [MiniKitProductAllotmentModelPage]
})
export class ProductAllotmentModelPageModule {}
