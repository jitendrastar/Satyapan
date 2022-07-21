import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrchardPostVerificationPage } from './orchard-post-verification.page';

const routes: Routes = [
  {
    path: '',
    component: OrchardPostVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrchardPostVerificationPageRoutingModule {}
