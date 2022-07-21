import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavParams } from '@ionic/angular';
import { AddFarmerModelPageRoutingModule } from './add-farmer-model-routing.module';
import { AddFarmerModelPage } from './add-farmer-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFarmerModelPageRoutingModule
  ],
  declarations: [AddFarmerModelPage],
  providers: [NavParams]
})
export class AddFarmerModelPageModule { }
