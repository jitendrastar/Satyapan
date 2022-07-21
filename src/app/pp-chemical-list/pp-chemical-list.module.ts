import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpChemicalListPageRoutingModule } from './pp-chemical-list-routing.module';

import { PpChemicalListPage } from './pp-chemical-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PpChemicalListPageRoutingModule
  ],
  declarations: [PpChemicalListPage]
})
export class PpChemicalListPageModule {}
