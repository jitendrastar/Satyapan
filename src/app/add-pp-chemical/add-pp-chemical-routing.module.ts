import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPpChemicalPage } from './add-pp-chemical.page';

const routes: Routes = [
  {
    path: '',
    component: AddPpChemicalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPpChemicalPageRoutingModule {}
