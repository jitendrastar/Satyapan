import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WheatherUpdateImagePage } from './wheather-update-image.page';

const routes: Routes = [
  {
    path: '',
    component: WheatherUpdateImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WheatherUpdateImagePageRoutingModule {}
