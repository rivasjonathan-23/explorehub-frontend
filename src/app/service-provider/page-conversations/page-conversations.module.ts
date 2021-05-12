import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageConversationsPageRoutingModule } from './page-conversations-routing.module';

import { PageConversationsPage } from './page-conversations.page';
import { ComponentsModulePageModule } from 'src/app/components-module/components-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageConversationsPageRoutingModule,
    ComponentsModulePageModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PageConversationsPage]
})
export class PageConversationsPageModule {}
