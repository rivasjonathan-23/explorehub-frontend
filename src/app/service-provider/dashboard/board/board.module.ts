import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardPageRoutingModule } from './board-routing.module';

import { BoardPage } from './board.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BoardPageRoutingModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BoardPage]
})
export class BoardPageModule {}
