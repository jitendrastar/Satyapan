import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KskUploadImagePage } from './ksk-upload-image.page';

const routes: Routes = [
  {
    path: '',
    component: KskUploadImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KskUploadImagePageRoutingModule {}
