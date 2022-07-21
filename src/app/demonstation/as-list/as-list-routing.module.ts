import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsListPage } from './as-list.page';

const routes: Routes = [
  {
    path: '',
    component: AsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsListPageRoutingModule {}
