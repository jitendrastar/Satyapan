import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JanAadharDetailModelPageRoutingModule } from './jan-aadhar-detail-model-routing.module';

import { JanAadharDetailModelPage } from './jan-aadhar-detail-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JanAadharDetailModelPageRoutingModule
  ],
  declarations: [JanAadharDetailModelPage]
})
export class JanAadharDetailModelPageModule {}
