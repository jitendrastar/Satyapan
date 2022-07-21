import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MbsyFinalAllotmentPageRoutingModule } from './mbsy-final-allotment-routing.module';

import { MbsyFinalAllotmentPage } from './mbsy-final-allotment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MbsyFinalAllotmentPageRoutingModule
  ],
  declarations: [MbsyFinalAllotmentPage]
})
export class MbsyFinalAllotmentPageModule {}
