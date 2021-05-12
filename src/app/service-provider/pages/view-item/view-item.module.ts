import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewItemPageRoutingModule } from './view-item-routing.module';

import { ViewItemPage } from './view-item.page';
import { ServiceDetailsComponent } from '../service-details/service-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewItemPageRoutingModule,
    IonicModule.forRoot()
  ],
  declarations: [ViewItemPage, ServiceDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewItemPageModule {}
