import {Component, Inject, OnInit} from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Address} from "../../../models/address";
import {ProductInOrder} from "../../../models/productInOrder";
import {Order} from "../../../models/order";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AddressService} from "../../../services/address.service";
import {CartService} from "../../../services/cart.service";
import {NavigatorService} from "../../../services/navigator.service";
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'app-order-check',
  templateUrl: './order-check.component.html',
  styleUrls: ['./order-check.component.scss'],
  providers : [DialogService]
})
export class OrderCheckComponent implements OnInit {

  addressDialog = false;

  ref: DynamicDialogRef;
  total: number = 0;
  addresses: Address[] | null = [];
  addressSelect: Address;
  productInOrders: ProductInOrder[] = [];
  order: Order;

  constructor(public dialogService: DialogService,
              private messageService: MessageService,
              private addressService: AddressService,
              private cartService: CartService,
              private router: Router,
              private navigator: NavigatorService,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    this.addressService.getListAddress().subscribe(
      result => {
        this.addresses = result;
        if (this.addresses?.length === 0){
          this.addAddress();
        }
      }
    )
    this.addressService.getAllAddress().subscribe(
      (data) => {
        this.addresses = data;
        this.addressService.setListAddress(this.addresses);
        if (data === null){
          this.addAddress();
        }
      },
      (error) => {
        console.log(error);
      }
    )
    this.cartService.getCart().subscribe(
      (data) => {
        this.productInOrders = data['products'].filter(p => p.status !== false);
        this.total = this.productInOrders.reduce(
          (prev, cur) => prev + cur.count * (cur.productPrice - (cur.discount*cur.productPrice)/100),0
        )
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addAddress() {
    this.addressDialog = true;
  }

  editAddress(){

  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  closeDialog(){
    this.addressDialog = false;
  }

  createOrder(){
    if (this.addressSelect === null){
      Swal.fire({
        title: "Error",
        text: "Bạn hãy chọn địa chỉ giao hàng",
        icon: "error"
      })
    }
    this.cartService.createOrder(this.addressSelect).subscribe(
      (data) => {
        this.order = data;
        Swal.fire({
          title: "Success",
          text: "Đặt hàng thành công",
          icon: "success"
        });
        this.cartService.setItemsSubject([]);
        this.cartService.setTotal("0");
        this.router.navigate(["/ho-so/don-hang/" + data.orderId])
      },
      (error) => {
        Swal.fire({
          title: "Error",
          text: "Bạn hãy chọn địa chỉ giao hàng",
          icon: "error"
        })
      }
    )
  }

  backToPreviousPage(){
    this.navigator.back();
  }
  visibleSidebarBottom: boolean = false;
  showBar(){
    this.visibleSidebarBottom = true;
  }


}
