import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemonstrationSowingMemberListPage } from './demonstration-sowing-member-list.page';

const routes: Routes = [
  {
    path: '',
    component: DemonstrationSowingMemberListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemonstrationSowingMemberListPageRoutingModule {}
