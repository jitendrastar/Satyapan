import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemonstrationHarvestingMemberListPage } from './demonstration-harvesting-member-list.page';

const routes: Routes = [
  {
    path: '',
    component: DemonstrationHarvestingMemberListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemonstrationHarvestingMemberListPageRoutingModule {}
