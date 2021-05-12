import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { VerificationPageRoutingModule } from "./verification-routing.module";

import { VerificationPage } from "./verification.page";
import { ComponentsModulePageModule } from "src/app/components-module/components-module.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModulePageModule
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [VerificationPage],
})
export class VerificationPageModule {}
