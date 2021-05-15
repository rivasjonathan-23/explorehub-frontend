import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardPageRoutingModule } from './board-routing.module';

import { BoardPage } from './board.page';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModulePageModule } from 'src/app/components-module/components-module.module';

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BoardPageRoutingModule,
    ComponentsModulePageModule
  ],
  declarations: [BoardPage]
})
export class BoardPageModule {}
