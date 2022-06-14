import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";
import {ShopInfoService} from "../../services/shopInfo.service";
import {Infoshop} from "../../models/infoshop";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() listCategory: any[];
  @Input() infoShop: Infoshop;


  constructor(public login: TokenStorageService,
              private router : Router,
              private categoryService: CategoryService,
              private cartService: CartService,
              public userService: UserService,
              ) { }

  routeProductOfCategory(id: any, name: string){
    this.router.navigate(['/', this.categoryService.custom(name), id]);
  }
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.userService.roles.subscribe((data) => {
      if (data === 'admin'){
        this.isAdmin = true;
      }else {
        this.isAdmin = false;
      }
    })
  }

  logout(){
    this.login.signOut();
    this.cartService.setTotal("0");
    this.cartService.setItemsSubject(null);
    this.router.navigate(['/login']);
  }

}
