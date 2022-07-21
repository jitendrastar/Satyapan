import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HortiApplicationBillModelPageRoutingModule } from './horti-application-bill-model-routing.module';

import { HortiApplicationBillModelPage } from './horti-application-bill-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HortiApplicationBillModelPageRoutingModule
  ],
  declarations: [HortiApplicationBillModelPage]
})
export class HortiApplicationBillModelPageModule {}
