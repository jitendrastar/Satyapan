import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MBSYDashboardPageRoutingModule } from './mbsy-dashboard-routing.module';

import { MBSYDashboardPage } from './mbsy-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MBSYDashboardPageRoutingModule
  ],
  declarations: [MBSYDashboardPage]
})
export class MBSYDashboardPageModule {}
