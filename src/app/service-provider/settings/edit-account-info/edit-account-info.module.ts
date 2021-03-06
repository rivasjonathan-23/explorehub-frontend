import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountInfoPageRoutingModule } from './edit-account-info-routing.module';

import { EditAccountInfoPage } from './edit-account-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditAccountInfoPageRoutingModule
  ],
  declarations: [EditAccountInfoPage],schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditAccountInfoPageModule {}
