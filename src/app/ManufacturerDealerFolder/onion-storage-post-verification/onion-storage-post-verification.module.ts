import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnionStoragePostVerificationPageRoutingModule } from './onion-storage-post-verification-routing.module';

import { OnionStoragePostVerificationPage } from './onion-storage-post-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnionStoragePostVerificationPageRoutingModule
  ],
  declarations: [OnionStoragePostVerificationPage]
})
export class OnionStoragePostVerificationPageModule {}
