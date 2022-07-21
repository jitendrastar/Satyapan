import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignSubmissionAaoPage } from './assign-submission-aao.page';

const routes: Routes = [
  {
    path: '',
    component: AssignSubmissionAaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignSubmissionAaoPageRoutingModule {}
