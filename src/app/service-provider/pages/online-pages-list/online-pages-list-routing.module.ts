import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlinePagesListPage } from './online-pages-list.page';

const routes: Routes = [
  {
    path: '',
    component: OnlinePagesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlinePagesListPageRoutingModule {}
