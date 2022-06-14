import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../models/order";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  @Input() orders: Order[] = [];
  ordersView: Order[] = [];
  type: string;
  @Output() viewDetail = new EventEmitter();

  constructor(private orderService: CartService) { }

  ngOnInit(): void {
    this.ordersView = this.orders;
    this.type = "TOTAL";
  }

  viewDetailOrder(){
    this.viewDetail.emit();
  }

  waitForConfirm(){
    this.ordersView = this.orders.filter(o => o.orderStatus == 0);
    this.type = "WAIT";
  }
  delivered(){
    this.ordersView = this.orders.filter(o => o.orderStatus == 1);
    this.type = "DELIVERED";
  }

  cancel(){
    this.ordersView = this.orders.filter(o => o.orderStatus == 2);
    this.type = "CANCEL";
  }

  totalOrder(){
    this.ordersView = this.orders;
    this.type = "TOTAL";
  }

}
