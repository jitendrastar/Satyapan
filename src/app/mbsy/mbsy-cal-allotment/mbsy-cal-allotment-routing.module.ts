import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MbsyCalAllotmentPage } from './mbsy-cal-allotment.page';

const routes: Routes = [
  {
    path: '',
    component: MbsyCalAllotmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MbsyCalAllotmentPageRoutingModule {}
