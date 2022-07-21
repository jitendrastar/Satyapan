import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MbsyGroupPage } from './mbsy-group.page';

const routes: Routes = [
  {
    path: '',
    component: MbsyGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MbsyGroupPageRoutingModule {}
