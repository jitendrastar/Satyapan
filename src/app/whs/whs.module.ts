import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhsPageRoutingModule } from './whs-routing.module';

import { WhsPage } from './whs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhsPageRoutingModule
  ],
  declarations: [WhsPage]
})
export class WhsPageModule {}
