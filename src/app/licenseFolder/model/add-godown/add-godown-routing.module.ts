import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGodownPage } from './add-godown.page';

const routes: Routes = [
  {
    path: '',
    component: AddGodownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGodownPageRoutingModule {}
