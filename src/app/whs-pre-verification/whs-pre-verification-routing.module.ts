import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhsPreVerificationPage } from './whs-pre-verification.page';

const routes: Routes = [
  {
    path: '',
    component: WhsPreVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhsPreVerificationPageRoutingModule {}
