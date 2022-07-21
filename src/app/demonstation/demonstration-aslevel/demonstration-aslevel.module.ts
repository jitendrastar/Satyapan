import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemonstrationAslevelPageRoutingModule } from './demonstration-aslevel-routing.module';

import { DemonstrationAslevelPage } from './demonstration-aslevel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemonstrationAslevelPageRoutingModule
  ],
  declarations: [DemonstrationAslevelPage]
})
export class DemonstrationAslevelPageModule {}
