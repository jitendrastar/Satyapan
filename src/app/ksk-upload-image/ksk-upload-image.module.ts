import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KskUploadImagePageRoutingModule } from './ksk-upload-image-routing.module';

import { KskUploadImagePage } from './ksk-upload-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KskUploadImagePageRoutingModule
  ],
  declarations: [KskUploadImagePage]
})
export class KskUploadImagePageModule {}
