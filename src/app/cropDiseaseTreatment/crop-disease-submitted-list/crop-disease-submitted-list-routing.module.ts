import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropDiseaseSubmittedListPage } from './crop-disease-submitted-list.page';

const routes: Routes = [
  {
    path: '',
    component: CropDiseaseSubmittedListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropDiseaseSubmittedListPageRoutingModule {}
