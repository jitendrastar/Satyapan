import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGodownPageRoutingModule } from './add-godown-routing.module';

import { AddGodownPage } from './add-godown.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGodownPageRoutingModule
  ],
  declarations: [AddGodownPage]
})
export class AddGodownPageModule {}
