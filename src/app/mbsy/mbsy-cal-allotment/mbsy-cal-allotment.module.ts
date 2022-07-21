import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MbsyCalAllotmentPageRoutingModule } from './mbsy-cal-allotment-routing.module';

import { MbsyCalAllotmentPage } from './mbsy-cal-allotment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MbsyCalAllotmentPageRoutingModule
  ],
  declarations: [MbsyCalAllotmentPage]
})
export class MbsyCalAllotmentPageModule {}
