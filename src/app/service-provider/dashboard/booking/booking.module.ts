import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';
import { ComponentsModulePageModule } from 'src/app/components-module/components-module.module';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    BookingPageRoutingModule,
    ComponentsModulePageModule
  ],
  declarations: []
})

export class BookingPageModule {}
