import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {VerifyComponent} from "./pages/register/verify.component";
import {ViewOrderStatusComponent} from "./pages/view-order-status/view-order-status.component";
import {UserGuard} from "./guards/user.guard";
import {InfoUserComponent} from "./pages/info-user/info-user.component";
import {ProfileMobileComponent} from "./pages/profile-mobile/profile-mobile.component";
import {TokenComponent} from "./pages/register/token.component";
import {ProductInCategoryComponent} from "./pages/product-in-category/product-in-category.component";
import {NeverActiveGuard} from "./guards/neverActive.guard";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {TokenResetPasswordComponent} from "./pages/forgot-password/token-reset-password.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'san-pham', loadChildren: async () => (await import('../app/feature/product/product.module')).ProductModule},
  {path: 'search', loadChildren: async () => (await import('../app/feature/product-search/product-search.module')).ProductSearchModule},
  {path: 'gio-hang-cua-ban', loadChildren: async () => (await import('../app/feature/card/card.module')).CardModule},
  {path: 'dat-hang-va-thanh-toan', loadChildren: async () => (await import('../app/feature/order/order.module')).OrderModule},
  {path: 'ket-noi-voi-shop', loadChildren: async () => (await import('../app/feature/contact/contact.module')).ContactModule},
  {path: 'huong-dan-mua-hang', loadChildren: async () => (await import('../app/feature/tutorial-buy/tutorial-buy.module')).TutorialBuyModule},
  {path: 'chinh-sach-bao-hanh-doi-tra', loadChildren: async () => (await import('../app/feature/policy/policy.module')).PolicyModule},
  {path: 'admin', loadChildren: async () => (await import('../app/admin/admin.module')).AdminModule},

  // {path: 'danh-muc-san-pham', loadChildren: async () => (await import('../app/feature/product-of-category/product-of-category.module')).ProductOfCategoryModule},
  {path:'', pathMatch: 'full', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dang-ky',
    component: RegisterComponent
  },
  {
    path: 'profileMobile',
    component: ProfileMobileComponent
  },
  {
    path: 'ho-so',
    component: InfoUserComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'don-hang/:orderId',
        component: ViewOrderStatusComponent
      }
    ]
  },
  {
    path: 'verifyEmail',
    component: VerifyComponent
  },
  {
    path: 'verify',
    component: TokenComponent
  },
  {
    path: 'quen-mat-khau',
    component: ForgotPasswordComponent
  },
  {
    path: 'dat-lai-mat-khau',
    component: TokenResetPasswordComponent
  },
  {
    path: ':nameCategory/:idCategory',
    component: ProductInCategoryComponent,
    canActivate: [NeverActiveGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
