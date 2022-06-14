import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PolicyComponent} from "./policy/policy.component";
import {RouterModule} from "@angular/router";
import {ShareModule} from "../../share/share.module";



@NgModule({
  declarations: [
    PolicyComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: PolicyComponent}
    ]),
    CommonModule,
    ShareModule
  ]
})
export class PolicyModule { }
