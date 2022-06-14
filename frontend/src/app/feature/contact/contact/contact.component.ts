import { Component, OnInit } from '@angular/core';
import {ShopInfoService} from "../../../services/shopInfo.service";
import {Infoshop} from "../../../models/infoshop";
import {Observable} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private infoShopService: ShopInfoService) { }

  infoShop: Infoshop;
  ngOnInit(): void {
    this.infoShopService.getTotalInfoShop().subscribe(
      (data) => {
        this.infoShop = data;
      }
    )
  }

}
