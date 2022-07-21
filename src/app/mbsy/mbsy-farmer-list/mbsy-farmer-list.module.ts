import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { MbsyFarmerListPageRoutingModule } from './mbsy-farmer-list-routing.module';

import { MbsyFarmerListPage } from './mbsy-farmer-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MbsyFarmerListPageRoutingModule
  ],
  declarations: [MbsyFarmerListPage],
  providers: [NavParams]
})
export class MbsyFarmerListPageModule {}
