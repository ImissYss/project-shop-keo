import {AfterContentChecked, Component, Inject, OnDestroy, OnInit} from '@angular/core';

import {debounceTime, Subject, Subscription, switchMap} from "rxjs";

import {CartService} from "../../../services/cart.service";
import {UserService} from "../../../services/user.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {NavigatorService} from "../../../services/navigator.service";
import {ProductService} from "../../../services/product.service";
import {ProductInOrder} from "../../../models/productInOrder";
import {JwtResponse} from "../../../message/JwtResponse";
import {DOCUMENT} from "@angular/common";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy, AfterContentChecked {

  constructor(private cartService: CartService,
              private userService: UserService,
              private tokenService: TokenStorageService,
              private navigator: NavigatorService,
              private productService: ProductService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) {
    this.userSubscription = this.userService.getCurrentUser().subscribe(user => this.currentUser = user);
  }

  spinner:boolean;

  //lấy ra các sản phẩm khách hàng cũng có thể thích
  topSearchProducts: any[];
  sort: string = "sold,desc";
  pageSize = 20;
  page = 1;
  title = "Bạn có thể cũng thích";
  viewCarousel1 = false;

  productInOrders: ProductInOrder[];
  total = 0;
  currentUser: JwtResponse;
  userSubscription: Subscription;

  private updateTerms = new Subject<ProductInOrder>();
  sub: Subscription;

  ngOnInit(): void {
    this.spinner = true;
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    // Lấy ra danh sách các sản phẩm khách hàng cũng có thể thích
    this.productService.getAllProduct(this.sort, this.pageSize, this.page -1).subscribe(
      (data) => {
        const {products} = data;
        this.topSearchProducts = products;
        this.spinner = false;
      },
      (error) => {
        console.log(error);
      }
    )
    this.cartService.getCart().subscribe(
      (data) => {
        this.productInOrders = data['products'];
        if (this.productInOrders.filter(p => p.status === false).length === 0){
          this.masterSelected = true;
        }else {
          this.masterSelected = false;
        }
      }
    )

    this.sub = this.updateTerms.pipe(
      debounceTime(300),
      switchMap((productInOrder: ProductInOrder) => this.cartService.update(productInOrder))
    ).subscribe(prod => {
        if (prod){console.log("update true")}
      },
      _=> console.log("Update Item Faild"));
    this.sub = this.updateTerms.pipe(
      debounceTime(300),
      switchMap((productInOrder: ProductInOrder) => this.cartService.updateStatus(productInOrder))
    ).subscribe(prod => {
        if (prod){console.log("update true")}
      },
      _=> console.log("Update Item Faild"));

  }

  static validateCount(productInOrder: ProductInOrder){
    const max = productInOrder.productStock;
    if (productInOrder.count > max) {
      productInOrder.count = max;
    }else if (productInOrder.count < 1) {
      productInOrder.count = 1;
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  totalItem: any;

  ngAfterContentChecked() {
    if (this.productInOrders && this.productInOrders.length > 0){
      this.total = this.productInOrders?.filter(p => p.status !== false).reduce(
        (prev, cur) => prev + cur.count * (cur.productPrice - (cur.discount*cur.productPrice)/100),0)
    }
    this.totalItem = this.productInOrders?.filter(p => p.status !== false).length;
  }
  onchange(product: ProductInOrder){
    if (this.currentUser){
      this.updateTerms.next(product)
      if (this.productInOrders.filter(p => p.status === false).length !== 0){
        this.masterSelected = false;
      }else if (this.productInOrders.filter(p => p.status === false).length === 0){
        this.masterSelected = true;
      }
    }
  }

  addOne(productInOrder: ProductInOrder) {
    productInOrder.count++;
    CardComponent.validateCount(productInOrder);
    if (this.currentUser){this.updateTerms.next(productInOrder)}

  }
  masterSelected:boolean

  checkAll(){
    console.log(this.masterSelected);
    this.productInOrders.forEach(p => {
      p.status = this.masterSelected;
    })
    console.log(this.productInOrders);
    this.productInOrders.forEach(p => {
      if (this.currentUser){this.cartService.updateStatus(p).subscribe(
        (data) => {
          console.log(data);
        }
      )}
    })

  }

  minusOne(productInOrder) {
    productInOrder.count--;
    CardComponent.validateCount(productInOrder);
    if (this.currentUser){this.updateTerms.next(productInOrder)}
  }

  onChange(productInOrder: ProductInOrder) {
    CardComponent.validateCount(productInOrder);
    if (this.currentUser){this.updateTerms.next(productInOrder)}
  }

  routerOrder(){
    if (this.productInOrders.filter(p => p.status !== false).length === 0){
      Swal.fire({
        title: "Lỗi",
        text: "Bạn chưa chọn sản phẩm nào!",
        icon: "error"
      })
    }else{
      this.router.navigate(["/dat-hang-va-thanh-toan"]);
    }
  }

  remove(productInOrder: ProductInOrder) {

    this.cartService.remove(productInOrder)!.subscribe(
      success => {
        this.productInOrders = this.productInOrders.filter(e => e.productId !== productInOrder.productId)
      },
      _ => console.log('Remove Cart Failed')
    )

  }
  returnPrevPage(){
    this.navigator.back();
  }
}
