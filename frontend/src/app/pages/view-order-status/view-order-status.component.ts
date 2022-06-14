import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {Order} from "../../models/order";
import {MenuItem} from "primeng/api";
import {NavigatorService} from "../../services/navigator.service";

@Component({
  selector: 'app-view-order-status',
  templateUrl: './view-order-status.component.html',
  styleUrls: ['./view-order-status.component.scss']
})
export class ViewOrderStatusComponent implements OnInit {

  order: Order;
  items: MenuItem[];

  constructor(private route: ActivatedRoute,
              private orderService: CartService,
              private navigator: NavigatorService,
              private router: Router) { }

  ngOnInit(): void {
    this.items = [{
      label: 'Đặt hàng',
    },
      {
        label: 'Chờ xác nhận',
      },
      {
        label: 'Thanh toán',
      },
      {
        label: 'Đã giao hàng',
      }
    ];
    this.route.paramMap.subscribe(params => {
      const id = +params.get("orderId")!;
      this.orderService.getOrder(id).subscribe(
        (order) => {
          this.order = order;
        },
        (error) => {
          console.log(error);
        }
      )
    })
  }
  returnPrev(){
    this.router.navigate(['/'])
  }

}
