import { NgModule } from '@angular/core';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {ShareModule} from "./share/share.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {CarouselModule} from "ngx-owl-carousel-o";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {AccountComponent} from "./pages/account/account.component";
import {ErrorComponent} from "./pages/error/error.component";
import {FixContentComponent} from "./pages/fix-content/fix-content.component";
import {FooterComponent} from "./pages/footer/footer.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {InfoUserComponent} from "./pages/info-user/info-user.component";
import {ProductListComponent} from "./pages/product-list/product-list.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ProfileMobileComponent} from "./pages/profile-mobile/profile-mobile.component";
import {TopSellerComponent} from "./pages/top-seller/top-seller.component";
import {ViewOrderStatusComponent} from "./pages/view-order-status/view-order-status.component";
import {OrderInfoComponent} from "./pages/order-info/order-info.component";
import {SpinnerComponent} from "./share/spinner/spinner.component";
import {ProductInCategoryComponent} from "./pages/product-in-category/product-in-category.component";
import {authInterceptorProviders} from "./interceptors/auth.interceptor";
import {ConfirmationService, MessageService} from "primeng/api";
import {TokenComponent} from "./pages/register/token.component";
import {FilterPipe} from "./share/pipes/filter.pipe";
import {VerifyComponent} from "./pages/register/verify.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {TokenResetPasswordComponent} from "./pages/forgot-password/token-reset-password.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AccountComponent,
        ErrorComponent,
        FixContentComponent,
        LoginComponent,
        FooterComponent,
        RegisterComponent,
        NotFoundComponent,
        InfoUserComponent,
        ProductListComponent,
        ProfileComponent,
        ProfileMobileComponent,
        TopSellerComponent,
        ViewOrderStatusComponent,
        OrderInfoComponent,
        ProductInCategoryComponent,
        TokenComponent,
      VerifyComponent,
      ForgotPasswordComponent,
      TokenResetPasswordComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
      TransferHttpCacheModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        CarouselModule,
        RouterModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        DynamicDialogModule,
        BrowserTransferStateModule,
        ShareModule
    ],
    providers: [authInterceptorProviders, DialogService, MessageService, ConfirmationService
    ],
    exports: [
      FooterComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
