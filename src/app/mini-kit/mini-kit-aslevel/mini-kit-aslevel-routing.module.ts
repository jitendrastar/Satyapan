import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiniKitAslevelPage } from './mini-kit-aslevel.page';

const routes: Routes = [
  {
    path: '',
    component: MiniKitAslevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniKitAslevelPageRoutingModule {}
