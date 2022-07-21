import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemonstrationBeneficiaryPageRoutingModule } from './demonstration-beneficiary-routing.module';

import { DemonstrationBeneficiaryPage } from './demonstration-beneficiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemonstrationBeneficiaryPageRoutingModule
  ],
  declarations: [DemonstrationBeneficiaryPage]
})
export class DemonstrationBeneficiaryPageModule {}
