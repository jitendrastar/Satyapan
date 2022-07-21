import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WheatherUpdateImagePageRoutingModule } from './wheather-update-image-routing.module';

import { WheatherUpdateImagePage } from './wheather-update-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WheatherUpdateImagePageRoutingModule
  ],
  declarations: [WheatherUpdateImagePage]
})
export class WheatherUpdateImagePageModule {}
