import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {TokenStorageService} from "./services/token-storage.service";
import {ShopInfoService} from "./services/shopInfo.service";
import {Infoshop} from "./models/infoshop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isUser: boolean = true;
  isShow: boolean;
  topPosToStartShowing = 100;
  constructor(private userService: UserService,
              private token: TokenStorageService,
              private infoShopService: ShopInfoService) {
  }
  title = 'tpshop-blog';
  infoShop: Infoshop;

  ngOnInit(): void {
    this.userService.roles.subscribe(
      (data) => {
        if (data === 'admin'){
          this.isUser = false;
        }else {
          this.isUser = true;
        }
      }
    )
    this.infoShopService.getTotalInfoShop().subscribe(
      data => {
        this.infoShop = data;
      }
    )
  }
  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
