import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { HttpClientModule } from "@angular/common/http";
import { RegisterPageRoutingModule } from "./register-routing.module";

import { RegisterPage } from "./register.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
