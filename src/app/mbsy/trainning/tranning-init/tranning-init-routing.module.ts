import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TranningInitPage } from './tranning-init.page';

const routes: Routes = [
  {
    path: '',
    component: TranningInitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranningInitPageRoutingModule {}
