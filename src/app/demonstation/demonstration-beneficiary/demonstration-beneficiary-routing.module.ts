import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemonstrationBeneficiaryPage } from './demonstration-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: DemonstrationBeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemonstrationBeneficiaryPageRoutingModule {}
