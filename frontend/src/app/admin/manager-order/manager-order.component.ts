import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";
import {DialogService} from "primeng/dynamicdialog";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-manager-order',
  templateUrl: './manager-order.component.html',
  styleUrls: ['./manager-order.component.scss']
})
export class ManagerOrderComponent implements OnInit {
  orders: Order[] = [];
  selectOrders: Order[];
  loading: boolean = true;
  statuses:  any[];
  orderDialog: boolean = false;
  orderCurr: Order;
  statusVirtual: string = '';

  constructor(private orderService: OrderService,
              private dialogService: DialogService,
              private cartService: CartService) {
    orderService.getStatusVirtual.subscribe(
      (data) => {
        this.statusVirtual = data;
      }
    )

  }

  ngOnInit(): void {
    this.getOrderOfPage();
    this.statuses = [
      {label: 'chưa xử lý', value: 0},
      {label: 'hoàn thành', value: 1},
      {label: 'đã hủy', value: 2}
    ]
  }

  // sự kiện khi ấn xác nhận thì status của order đó trong list order cũng thay đổi theo
  changeStatus(event){
    // this.orderCurr.orderStatus = 1;
    console.log("event----------->"+event);
    console.log(this.orderCurr);
    this.orderCurr.orderStatus = event;
    let orderVirtual: Order[] = [];
    this.orders.forEach(o => {
        if(o.orderId == this.orderCurr.orderId){
          o.orderStatus = event;
        }
        orderVirtual.push(o);

    })
    this.orders = orderVirtual;


  }

  getOrderOfPage(): void{
    this.orderService.getAllOrderByAdmin().subscribe(
      (data) => {
        this.orders = data;
        this.orders.forEach(o => o.createTime = new Date(o.createTime));
        this.loading = false;

      },
      (error) =>  {
        console.log(error);
      }
    )
  }
  openNew(){

  }
  viewOrder(orderId: number){
    console.log(orderId);
    this.cartService.getOrder(orderId).subscribe(
      (data) => {
        this.orderCurr = data;
      },
      (error) =>{
        console.log(error);
      }
    )
    this.orderDialog = true;
  }

}
