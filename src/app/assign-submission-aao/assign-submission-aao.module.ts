import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignSubmissionAaoPageRoutingModule } from './assign-submission-aao-routing.module';

import { AssignSubmissionAaoPage } from './assign-submission-aao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignSubmissionAaoPageRoutingModule
  ],
  declarations: [AssignSubmissionAaoPage]
})
export class AssignSubmissionAaoPageModule {}
