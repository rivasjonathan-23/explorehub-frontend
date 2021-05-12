import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindAccountPageRoutingModule } from './find-account-routing.module';

import { FindAccountPage } from './find-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindAccountPageRoutingModule,
    ReactiveFormsModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FindAccountPage]
})
export class FindAccountPageModule {}
