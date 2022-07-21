import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniKitDashboardPageRoutingModule } from './mini-kit-dashboard-routing.module';

import { MiniKitDashboardPage } from './mini-kit-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiniKitDashboardPageRoutingModule
  ],
  declarations: [MiniKitDashboardPage]
})
export class MiniKitDashboardPageModule {}
