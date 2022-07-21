import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PpChemicalListPage } from './pp-chemical-list.page';

const routes: Routes = [
  {
    path: '',
    component: PpChemicalListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PpChemicalListPageRoutingModule {}
