import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ShareModule} from "../share/share.module";
import {SlidebarComponent} from "./slidebar/slidebar.component";
import {ProductListByAdminComponent} from "./product-list/product-list.component";
import {PolicyAdminComponent} from "./policy-admin/policy-admin.component";
import {ManagerOrderComponent} from "./manager-order/manager-order.component";
import {InfoShopComponent} from "./info-shop/info-shop.component";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {DetailOrderComponent} from "./detail-order/detail-order.component";
import {AdminGuard} from "../guards/admin.guard";
import { DashComponent } from './dash/dash.component';
import { CustomerComponent } from './customer/customer.component';

const route: Routes = [
  {path: '',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  children: [
    {
      path: 'dashboard',
      component: DashComponent
    },
    {
      path: 'thong-tin-shop',
      component: InfoShopComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'chinh-sach-bao-hanh-doi-tra',
      component: PolicyAdminComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'addCategory',
      component: CategoryFormComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'customer',
      component: CustomerComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'managerOrder',
      component: ManagerOrderComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'detailOrder',
      component: DetailOrderComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'listProduct',
      component: ProductListByAdminComponent,
      canActivate: [AdminGuard]
    }
  ]},
]
@NgModule({
  declarations: [
    DashboardComponent,
    SlidebarComponent,
    ProductListByAdminComponent,
    PolicyAdminComponent,
    ManagerOrderComponent,
    InfoShopComponent,
    CategoryFormComponent,
    DetailOrderComponent,
    DashComponent,
    CustomerComponent
  ],
  imports: [
    RouterModule.forChild(route),
    CommonModule,
    ShareModule
  ]
})
export class AdminModule { }
