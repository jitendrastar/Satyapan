import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropDiseaseRequestDetailPageRoutingModule } from './crop-disease-request-detail-routing.module';

import { CropDiseaseRequestDetailPage } from './crop-disease-request-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropDiseaseRequestDetailPageRoutingModule
  ],
  declarations: [CropDiseaseRequestDetailPage]
})
export class CropDiseaseRequestDetailPageModule {}
