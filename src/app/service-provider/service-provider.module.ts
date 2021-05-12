import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProviderPageRoutingModule } from './service-provider-routing.module';

import { ServiceProviderPage } from './service-provider.page';
@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    IonicModule,
    ServiceProviderPageRoutingModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ServiceProviderPage]
})
export class ServiceProviderPageModule {}

