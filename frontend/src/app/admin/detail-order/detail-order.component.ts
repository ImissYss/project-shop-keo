import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {CartService} from "../../services/cart.service";
import {Order} from "../../models/order";
import {NavigatorService} from "../../services/navigator.service";
import Swal from "sweetalert2";
import {MessageService, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent implements OnInit {

  @Input()order: Order;
  @Input()orderStatus: number;
  @Output('checkStatus') status = new EventEmitter<number>();

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private orderService: OrderService,
              private navigator: NavigatorService,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  emitChangeStatus(value){
    this.status.emit(value);
  }


  confirmOrder(orderId: number){

    this.orderService.confirmOrder(orderId).subscribe(
      (data) => {
        this.orderStatus = 1;
        this.emitChangeStatus(this.orderStatus);

      },
      (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Xác nhận đơn hàng thất bại'});

      }
    )
  }

  cancelOrder(orderId: number){
    this.emitChangeStatus(this.orderStatus);
    this.orderService.cancelOrder(orderId).subscribe(
      (data) => {
        this.orderStatus = 2;
        this.emitChangeStatus(this.orderStatus);
      },
      (error) => {
        console.log(error);

      }
    )
  }

}
