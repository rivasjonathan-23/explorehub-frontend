import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBookingAsProviderPageRoutingModule } from './view-booking-as-provider-routing.module';

import { ViewBookingAsProviderPage } from './view-booking-as-provider.page';
import { ComponentsModulePageModule } from 'src/app/components-module/components-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBookingAsProviderPageRoutingModule,
    ComponentsModulePageModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ViewBookingAsProviderPage]
})
export class ViewBookingAsProviderPageModule {}
