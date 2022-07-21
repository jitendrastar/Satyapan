import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropDiseaseRequestDetailPage } from './crop-disease-request-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CropDiseaseRequestDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropDiseaseRequestDetailPageRoutingModule {}
