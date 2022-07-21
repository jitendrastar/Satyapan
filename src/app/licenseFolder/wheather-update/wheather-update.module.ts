import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WheatherUpdatePageRoutingModule } from './wheather-update-routing.module';

import { WheatherUpdatePage } from './wheather-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WheatherUpdatePageRoutingModule
  ],
  declarations: [WheatherUpdatePage]
})
export class WheatherUpdatePageModule {}
