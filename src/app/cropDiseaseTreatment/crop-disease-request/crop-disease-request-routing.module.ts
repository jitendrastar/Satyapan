import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropDiseaseRequestPage } from './crop-disease-request.page';

const routes: Routes = [
  {
    path: '',
    component: CropDiseaseRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropDiseaseRequestPageRoutingModule {}
