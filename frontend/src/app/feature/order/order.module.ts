import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderCheckComponent} from "./order-check/order-check.component";
import {RouterModule} from "@angular/router";
import {UserGuard} from "../../guards/user.guard";
import {ShareModule} from "../../share/share.module";



@NgModule({
  declarations: [
    OrderCheckComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: OrderCheckComponent, canActivate: [UserGuard]}
    ]),
    CommonModule,
    ShareModule
  ]
})
export class OrderModule { }
