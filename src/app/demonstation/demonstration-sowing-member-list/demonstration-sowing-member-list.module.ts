import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemonstrationSowingMemberListPageRoutingModule } from './demonstration-sowing-member-list-routing.module';

import { DemonstrationSowingMemberListPage } from './demonstration-sowing-member-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemonstrationSowingMemberListPageRoutingModule
  ],
  declarations: [DemonstrationSowingMemberListPage]
})
export class DemonstrationSowingMemberListPageModule {}
