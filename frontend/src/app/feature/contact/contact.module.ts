import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactComponent} from "./contact/contact.component";
import {RouterModule} from "@angular/router";
import {ShareModule} from "../../share/share.module";



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: ContactComponent}
    ]),
    CommonModule,
    ShareModule
  ]
})
export class ContactModule { }
