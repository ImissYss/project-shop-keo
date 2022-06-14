import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TemplateProductResultComponent} from "./template-product-result/template-product-result.component";
import {RouterModule} from "@angular/router";
import {ShareModule} from "../../share/share.module";



@NgModule({
  declarations: [
    TemplateProductResultComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: TemplateProductResultComponent}
    ]),
    CommonModule,
    ShareModule
  ]
})
export class ProductSearchModule { }
