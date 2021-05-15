import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingPage } from './booking/booking.page';

import { DashboardPage } from './dashboard.page';
import { StatisticsPage } from './statistics/statistics.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'booking/:status',
        component: BookingPage,
      },
      {
        path: 'statistics',
        component: StatisticsPage,
      },
      {
        path: '',
        redirectTo: 'booking/Booked',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardPageRoutingModule { }
