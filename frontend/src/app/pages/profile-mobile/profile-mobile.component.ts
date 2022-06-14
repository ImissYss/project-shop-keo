import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {Order} from "../../models/order";
import {OrderStatus} from "../../enums/OrderStatus";
import {NavigatorService} from "../../services/navigator.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile-mobile.component.html',
  styleUrls: ['./profile-mobile.component.scss']
})
export class ProfileMobileComponent implements OnInit {
  user: User;
  orders: Order[] = [];
  orderFilterResult: Order[] = [];
  // biến này hiển thị sidebar bottom
  visibleSidebarBottom: boolean = false;
  visibleFilterSidebar: boolean = false;

  filterOption = [
    {label: 'Mặc định', value: -1},
    {label: 'Chờ xác nhận', value: OrderStatus.NEW},
    {label: 'Đã hoàn thành', value: OrderStatus.FINISHED},
    {label: 'Đã hủy', value: OrderStatus.Canceled}
  ]

  constructor(private navigator: NavigatorService,
              private login: TokenStorageService,
              private userService: UserService,
              private orderService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.login.isLoggedIn()){
      this.userService.getCurrentUser().subscribe(
        (data) => {
          this.user = data;
        }
      );

      this.orderService.getAllOrder().subscribe(
        (data) => {
          this.orders = data;
          this.orderFilterResult = data;
        }
      )
    }else{
      this.router.navigate(['/login']);
    }

  }

  returnPrev(){
    this.navigator.back();
  }

  showBarBottom(){
    this.visibleSidebarBottom = true;
  }
  showSidebarFilter(){
    this.visibleFilterSidebar = true;
  }

  filterByStatus(status: number){
    if (status === -1){
      this.orderFilterResult = this.orders;
    }else{
      this.orderFilterResult = this.orders.filter(o => o.orderStatus === status);
    }
    this.visibleFilterSidebar = false;
  }

}
