import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SideBarPageRoutingModule } from './side-bar-routing.module';

import { SideBarPage } from './side-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SideBarPageRoutingModule
  ],
  declarations: [SideBarPage],schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SideBarPageModule {}
