import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MbsyFinalAllotmentPage } from './mbsy-final-allotment.page';

const routes: Routes = [
  {
    path: '',
    component: MbsyFinalAllotmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MbsyFinalAllotmentPageRoutingModule {}
