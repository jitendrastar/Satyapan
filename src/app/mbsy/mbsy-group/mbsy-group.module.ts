import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MbsyGroupPageRoutingModule } from './mbsy-group-routing.module';

import { MbsyGroupPage } from './mbsy-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MbsyGroupPageRoutingModule
  ],
  declarations: [MbsyGroupPage]
})
export class MbsyGroupPageModule {}
