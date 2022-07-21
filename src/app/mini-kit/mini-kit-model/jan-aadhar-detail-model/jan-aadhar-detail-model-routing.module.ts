import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniKitJanAadharDetailModelPage } from './jan-aadhar-detail-model.page';

const routes: Routes = [
  {
    path: '',
    component: MiniKitJanAadharDetailModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JanAadharDetailModelPageRoutingModule {}
