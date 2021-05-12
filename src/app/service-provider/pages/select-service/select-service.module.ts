import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectServicePageRoutingModule } from './select-service-routing.module';

import { SelectServicePage } from './select-service.page';
import { ItemListDisplayComponent } from 'src/app/modules/page-services-display/item-list-display/item-list-display.component';
import { ComponentsModulePageModule } from 'src/app/components-module/components-module.module';
// import { SelectedServiceCardComponent } from '../selected-service-card/selected-service-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectServicePageRoutingModule,
    ComponentsModulePageModule,
    IonicModule.forRoot(),
  ],
  declarations: [SelectServicePage],schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SelectServicePageModule {}
