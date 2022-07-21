import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniKitAslevelPageRoutingModule } from './mini-kit-aslevel-routing.module';

import { MiniKitAslevelPage } from './mini-kit-aslevel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiniKitAslevelPageRoutingModule
  ],
  declarations: [MiniKitAslevelPage]
})
export class MiniKitAslevelPageModule {}
