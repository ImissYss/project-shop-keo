import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {CartService} from "../../services/cart.service";
import {Order} from "../../models/order";
import {User} from "../../models/user";
import {TokenStorageService} from "../../services/token-storage.service";
import {AddressService} from "../../services/address.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  viewStatus: boolean = true;

  user: User;
  orders: Order[] = [];
  option: any;
  options: any[] = [
    {label: 'Hồ sơ cá nhân', icon: 'pi pi-fw pi-user',value: 'profile'},
    {label: 'Đơn hàng',  icon: 'pi pi-briefcase', value: 'listOrder'}
  ];

  constructor(private orderService: CartService,
              private tokenService: TokenStorageService,
              private optionService: AddressService,
              private router: Router) { }

  ngOnInit(): void {
    this.optionService.getOption().subscribe(
      (data) =>{
        this.option = data;
      }
    )
    // this.option = 'profile';
    // lấy ra danh sách các order cho người dùng
    if (this.tokenService.isLoggedIn()){
      this.orderService.getAllOrder().subscribe(
        (data) => {
          this.orders = data;
        },
        (error) => {
          console.log(error);
        }
      )

      // lấy ra thông tin cá nhân
      this.user = this.tokenService.getUser();
    }

  }

  selectOption(option){
    this.router.navigate(['/ho-so'], {queryParams: {type: option}});
    this.option = option;
  }
  viewDeta(){
    this.option = 'detail';
  }
}
