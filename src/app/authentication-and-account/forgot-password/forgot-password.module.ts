import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ForgotPasswordPageRoutingModule } from "./forgot-password-routing.module";

import { ForgotPasswordPage } from "./forgot-password.page";
import { ComponentsModulePageModule } from "src/app/components-module/components-module.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModulePageModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ForgotPasswordPage],
})
export class ForgotPasswordPageModule {}
