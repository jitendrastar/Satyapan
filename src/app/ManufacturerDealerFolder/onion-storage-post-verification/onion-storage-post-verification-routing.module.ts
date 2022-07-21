import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnionStoragePostVerificationPage } from './onion-storage-post-verification.page';

const routes: Routes = [
  {
    path: '',
    component: OnionStoragePostVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnionStoragePostVerificationPageRoutingModule {}
