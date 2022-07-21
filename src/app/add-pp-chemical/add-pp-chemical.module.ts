import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPpChemicalPageRoutingModule } from './add-pp-chemical-routing.module';

import { AddPpChemicalPage } from './add-pp-chemical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPpChemicalPageRoutingModule
  ],
  declarations: [AddPpChemicalPage]
})
export class AddPpChemicalPageModule {}
