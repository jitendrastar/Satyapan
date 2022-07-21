import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropDiseaseRequestPageRoutingModule } from './crop-disease-request-routing.module';

import { CropDiseaseRequestPage } from './crop-disease-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropDiseaseRequestPageRoutingModule
  ],
  declarations: [CropDiseaseRequestPage]
})
export class CropDiseaseRequestPageModule {}
