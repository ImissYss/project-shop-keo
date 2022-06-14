import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NsButtonComponent} from "../base/ns-button.component";
import {HeaderComponent} from "./header/header.component";
import {AppPrimengModule} from "../app.primeng.module";
import {FilterPipePipe} from "./pipes/filter-pipe.pipe";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NsBadgesCompoent} from "../base/ns-badges.compoent";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {TopSearchComponent} from "./top-search/top-search.component";
import {AddAddressComponent} from "./add-address/add-address.component";
import {SidebarBottomComponent} from "./sidebar-bottom/sidebar-bottom.component";
import {NsButtonIconComponent} from "../base/ns-button-icon.component";
import {SeletonLoaderComponent} from "./seleton-loader/seleton-loader.component";
import {NsQuillEditorComponent} from "../base/ns-quill-editor.component";
import {QuillModule} from "ngx-quill";
import {SafePipePipe} from "./pipes/safePipe.pipe";
import {SpinnerComponent} from "./spinner/spinner.component";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {LazyLoadImageDirective} from "../directives/lazyLoadImage.directive";
import {HeroComponent} from "./hero/hero.component";
import {FilterPipe} from "./pipes/filter.pipe";

@NgModule({
  declarations: [
    NsButtonComponent,
    HeaderComponent,
    ProductDetailComponent,
    TopSearchComponent,
    AddAddressComponent,
    FilterPipePipe,
    SafePipePipe,
    FilterPipe,
    SidebarComponent,
    SidebarBottomComponent,
    NsBadgesCompoent,
    NsButtonIconComponent,
    SeletonLoaderComponent,
    NsQuillEditorComponent,
    SpinnerComponent,
    LazyLoadImageDirective,
    HeroComponent

  ],
  imports: [
    CommonModule,
    AppPrimengModule,
    QuillModule.forRoot(),
    LazyLoadImageModule,
  ],
  exports: [
    NsButtonComponent,
    HeaderComponent,
    AppPrimengModule,
    FilterPipePipe,
    SafePipePipe,
    SidebarComponent,
    NsBadgesCompoent,
    ProductDetailComponent,
    TopSearchComponent,
    AddAddressComponent,
    SidebarBottomComponent,
    NsButtonIconComponent,
    SeletonLoaderComponent,
    NsQuillEditorComponent,
    LazyLoadImageDirective,
    HeroComponent,
    SpinnerComponent
  ]
})
export class ShareModule { }
