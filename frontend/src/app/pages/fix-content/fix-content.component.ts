import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ShopInfoService} from "../../services/shopInfo.service";
import {Infoshop} from "../../models/infoshop";

@Component({
  selector: 'app-fix-content',
  templateUrl: './fix-content.component.html',
  styleUrls: ['./fix-content.component.scss']
})
export class FixContentComponent implements OnInit {

  constructor(private eRef: ElementRef,
              private infoShopService: ShopInfoService) { }

  infoShop: Infoshop;
  ngOnInit(): void {
    this.infoShopService.getTotalInfoShop().subscribe(
      data => {
        this.infoShop = data;
      }
    )

  }
  status: boolean = false;

  showIcon(event){
    this.status = !this.status;

  }

}
