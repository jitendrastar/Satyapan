import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WheatherUpdatePage } from './wheather-update.page';

const routes: Routes = [
  {
    path: '',
    component: WheatherUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WheatherUpdatePageRoutingModule {}
