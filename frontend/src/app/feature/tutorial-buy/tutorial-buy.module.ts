import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TutorialBuyComponent} from "./tutorial-buy/tutorial-buy.component";
import {RouterModule} from "@angular/router";
import {ShareModule} from "../../share/share.module";



@NgModule({
  declarations: [
    TutorialBuyComponent
  ],
  imports: [
    RouterModule.forChild([
      {path:'', component: TutorialBuyComponent}
    ]),
    CommonModule,
    ShareModule
  ]
})
export class TutorialBuyModule { }
