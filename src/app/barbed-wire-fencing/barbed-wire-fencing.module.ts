import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarbedWireFencingPageRoutingModule } from './barbed-wire-fencing-routing.module';

import { BarbedWireFencingPage } from './barbed-wire-fencing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarbedWireFencingPageRoutingModule
  ],
  declarations: [BarbedWireFencingPage]
})
export class BarbedWireFencingPageModule {}
