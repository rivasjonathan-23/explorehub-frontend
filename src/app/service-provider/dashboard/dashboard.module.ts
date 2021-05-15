import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModulePageModule } from 'src/app/components-module/components-module.module';
import { BookingPage } from './booking/booking.page';
import { StatisticsPage } from './statistics/statistics.page';

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ComponentsModulePageModule
  ],
  declarations: [DashboardPage, BookingPage, StatisticsPage]
})
export class DashboardPageModule {}
