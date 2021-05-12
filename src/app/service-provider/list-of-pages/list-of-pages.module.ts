import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListOfPagesPageRoutingModule } from './list-of-pages-routing.module';

import { ListOfPagesPage } from './list-of-pages.page';
import { ComponentsModulePageModule } from 'src/app/components-module/components-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfPagesPageRoutingModule,
    ComponentsModulePageModule,
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ListOfPagesPage]
})
export class ListOfPagesPageModule {}
