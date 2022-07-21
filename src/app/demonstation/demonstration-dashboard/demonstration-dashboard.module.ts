import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemonstrationDashboardPageRoutingModule } from './demonstration-dashboard-routing.module';

import { DemonstrationDashboardPage } from './demonstration-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemonstrationDashboardPageRoutingModule
  ],
  declarations: [DemonstrationDashboardPage]
})
export class DemonstrationDashboardPageModule {}
