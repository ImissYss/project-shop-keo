import { Component, OnInit } from '@angular/core';
import {ShopInfoService} from "../../services/shopInfo.service";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  users: User[] = [];

  constructor(private uS: UserService) { }

  ngOnInit(): void {
    this.uS.getAllInfoUser().subscribe(
      (data) => {
        this.users = data;
        console.log(data);
      }
    )
  }

}
