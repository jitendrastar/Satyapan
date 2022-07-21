import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropDiseaseSubmittedListPageRoutingModule } from './crop-disease-submitted-list-routing.module';

import { CropDiseaseSubmittedListPage } from './crop-disease-submitted-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropDiseaseSubmittedListPageRoutingModule
  ],
  declarations: [CropDiseaseSubmittedListPage]
})
export class CropDiseaseSubmittedListPageModule {}
