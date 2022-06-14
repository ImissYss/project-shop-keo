import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.scss'],
})
export class TopSearchComponent implements OnInit {

  @Input()
  topSearchProducts: any[];
  @Input()title: string;
  // Biến này để hiển thị div sản phẩm tương tự
  productSameDiv = false;
  //Biến này chỉ định dạng xem (hiện tại chỉ có 2 dạng carousel)
  @Input() viewCarousel1: boolean;

  @Input() viewCount = false;
  @Input( )customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 2
      },
      200:{
        items: 3
      },
      300: {
        items: 2
      },
      350: {
        items: 2,
      },
      400: {
        items:2
      },
      770: {
        items: 6
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  loaded: boolean = false;

  constructor(private router: Router,
              public categoryService: CategoryService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 5000)
  }

  routeDetailProduct(name: string, id: any){
    this.router.navigate(['/', this.categoryService.custom(name)], {queryParams: {p_id: id}})
    document.body.animate({scrollTop: 0}, 500);
    document.documentElement.scrollTop = 0;
  }

}
