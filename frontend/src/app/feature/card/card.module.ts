import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from "./card/card.component";
import {RouterModule} from "@angular/router";
import {ShareModule} from "../../share/share.module";
import {UserGuard} from "../../guards/user.guard";



@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: "", component: CardComponent, canActivate: [UserGuard]}
    ]),
    CommonModule,
    ShareModule
  ]
})
export class CardModule { }
