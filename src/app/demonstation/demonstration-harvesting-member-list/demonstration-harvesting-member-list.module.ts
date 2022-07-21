import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemonstrationHarvestingMemberListPageRoutingModule } from './demonstration-harvesting-member-list-routing.module';

import { DemonstrationHarvestingMemberListPage } from './demonstration-harvesting-member-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemonstrationHarvestingMemberListPageRoutingModule
  ],
  declarations: [DemonstrationHarvestingMemberListPage]
})
export class DemonstrationHarvestingMemberListPageModule {}
