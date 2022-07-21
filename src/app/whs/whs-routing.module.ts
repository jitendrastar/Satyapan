import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhsPage } from './whs.page';

const routes: Routes = [
  {
    path: '',
    component: WhsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhsPageRoutingModule {}
