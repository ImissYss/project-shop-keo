import { Component, OnInit } from '@angular/core';
import {ShopInfoService} from "../../services/shopInfo.service";
import {Infoshop} from "../../models/infoshop";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  infoShop: Infoshop;

  constructor(private infoShopService: ShopInfoService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.infoShopService.getTotalInfoShop().subscribe(
      (data) => {
        this.infoShop = data;
      }
    )
  }

  topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}
