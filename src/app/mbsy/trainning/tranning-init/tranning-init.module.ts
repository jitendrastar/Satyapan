import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranningInitPageRoutingModule } from './tranning-init-routing.module';

import { TranningInitPage } from './tranning-init.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranningInitPageRoutingModule
  ],
  declarations: [TranningInitPage]
})
export class TranningInitPageModule {}
