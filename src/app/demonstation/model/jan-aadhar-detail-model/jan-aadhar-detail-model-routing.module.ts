import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JanAadharDetailModelPage } from './jan-aadhar-detail-model.page';

const routes: Routes = [
  {
    path: '',
    component: JanAadharDetailModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JanAadharDetailModelPageRoutingModule {}
