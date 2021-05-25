import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModulePageRoutingModule } from './components-module-routing.module';

import { ComponentsModulePage } from './components-module.page';
import { BookingInfoDisplayComponent } from '../service-provider/pages/booking-info-display/booking-info-display.component';
import { LabelledTextComponent } from '../modules/page-elements/labelled-text/labelled-text.component';
import { LabelledTextDisplayComponent } from '../modules/page-elements-display/labelled-text-display/labelled-text-display.component';
import { BookingCardComponent } from '../service-provider/components/booking-card/booking-card.component';
import { SelectedServiceCardComponent } from '../service-provider/pages/selected-service-card/selected-service-card.component';
import { MessageBoxComponent } from '../service-provider/components/message-box/message-box.component';
import { NotificationCardComponent } from '../service-provider/components/notification-card/notification-card.component';
import { BulletFormTextDisplayComponent } from '../modules/page-elements-display/bullet-form-text-display/bullet-form-text-display.component';
import { OptionPopupComponent } from '../service-provider/components/option-popup/option-popup.component';
import { HeaderMenuComponent } from '../service-provider/components/header-menu/header-menu.component';
import { UpdateItemPopupComponent } from '../service-provider/components/update-item-popup/update-item-popup.component';
import { ConfirmPopupComponent } from '../service-provider/components/confirm-popup/confirm-popup.component';
import { NotificationHandlerComponent } from '../service-provider/components/notification-handler/notification-handler.component';
import { PageListCardComponent } from '../service-provider/page-list-card/page-list-card.component';
import { ConversationCardComponent } from '../service-provider/components/conversation-card/conversation-card.component';
import { OtherServiceCardComponent } from '../service-provider/pages/other-service-card/other-service-card.component';
import { GroupOfServicesComponent } from '../service-provider/components/group-of-services/group-of-services.component';
// import { ListOfPagesPage } from '../service-provider/list-of-pages/list-of-pages.page';
import { AllServicesComponent } from '../service-provider/pages/all-services/all-services.component';
import { CodeHandlerComponent } from '../authentication-and-account/code-handler/code-handler.component';
import { PageCreatorComponent } from '../modules/page-creator/page-creator.component';
import { PageElementListComponent } from '../modules/page-element-list/page-element-list.component';
import { WeatherComponent } from '../modules/common-components/weather/weather.component';
import { PageInputFieldListComponent } from '../modules/page-input-field-list/page-input-field-list.component';
import { SearchBarComponent } from '../service-provider/components/search-bar/search-bar.component';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModulePageRoutingModule,
  ],
  declarations: [
    ComponentsModulePage,
    MessageBoxComponent,
    BookingInfoDisplayComponent,
    LabelledTextDisplayComponent,
    BookingCardComponent,
    NotificationCardComponent,
    OptionPopupComponent,
    BulletFormTextDisplayComponent,
    HeaderMenuComponent,
    UpdateItemPopupComponent,
    ConfirmPopupComponent,
    PageListCardComponent,
    ConversationCardComponent,
    OtherServiceCardComponent,
    NotificationHandlerComponent,
    AllServicesComponent,
    GroupOfServicesComponent,
    PageCreatorComponent,
    PageInputFieldListComponent,
    WeatherComponent,
    PageElementListComponent,
    CodeHandlerComponent,
    SearchBarComponent,
    SelectedServiceCardComponent],
  exports: [
    BookingInfoDisplayComponent,
    LabelledTextDisplayComponent,
    BookingCardComponent,
    UpdateItemPopupComponent,
    BulletFormTextDisplayComponent,
    HeaderMenuComponent,
    NotificationCardComponent,
    PageElementListComponent,
    NotificationHandlerComponent,
    ConfirmPopupComponent,
    OtherServiceCardComponent,
    PageInputFieldListComponent,
    AllServicesComponent,
    WeatherComponent,
    PageCreatorComponent,
    GroupOfServicesComponent,
    ConversationCardComponent,
    SelectedServiceCardComponent,
    CodeHandlerComponent,
    SearchBarComponent,
    MessageBoxComponent,
    OptionPopupComponent,
    PageListCardComponent

  ]

})
export class ComponentsModulePageModule { }
