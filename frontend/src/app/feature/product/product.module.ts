import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {ShareModule} from "../../share/share.module";
import {ReviewComponent} from "./review/review.component";

@NgModule({
  declarations: [
    ProductInfoComponent,
    ReviewComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: ':nameProduct/:p_id',
        component: ProductInfoComponent
      },
    ]),
    CommonModule,
    ShareModule
  ]
})
export class ProductModule { }
