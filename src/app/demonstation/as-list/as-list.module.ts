import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsListPageRoutingModule } from './as-list-routing.module';

import { AsListPage } from './as-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsListPageRoutingModule
  ],
  declarations: [AsListPage]
})
export class AsListPageModule {}
