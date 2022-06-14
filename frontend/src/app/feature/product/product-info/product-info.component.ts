import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../models/product";
import {Image} from "../../../models/image";
import {ProductInOrder} from "../../../models/productInOrder";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {NavigatorService} from "../../../services/navigator.service";
import {CategoryService} from "../../../services/category.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CartService} from "../../../services/cart.service";
import {ProductService} from "../../../services/product.service";
import {OwlOptions} from "ngx-owl-carousel-o";
import Swal from "sweetalert2";
import {DOCUMENT} from "@angular/common";
import {ProductDTO} from "../../../models/dto/ProductDTO";
import {Random} from "../../../common/random";
import {Meta, Title} from "@angular/platform-browser";
import {CanonicalService} from "../../../services/canonical.service";

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {

  visibleSidebarBottom = false;

  //Hiển thị sản phẩm hiện có trong cart
  productInCart: string;
  show = false;

  //Lấy ra danh sách các sản phẩm tương tự
  productSame: ProductDTO[] = [];
  heart: boolean = false;
  viewCarousel1 = false;
  titleProductSame = "Sản phẩm tương tự";

  //Lấy ra danh sách các sản phẩm khác của shop
  productAnother: Product[] = [];
  titleProductAnother = "Các sản phẩm khác của shop";

  //Lấy ra danh sách các sản phẩm có thể người dùng cũng thich
  productCanLike: Product[] = [];
  titleProductCanLike = "Có thể bạn cũng thích";

  //mảng lưu trữ đường dẫn đến sản phẩm hiện tại
  breakCrumb : any[] = [];


  images: any[];
  product: Product;
  count: number = 1;
  filter$: Observable<any>;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    responsive: {
      150: {
        items: 4
      },
      200: {
        items: 4
      },
      300: {
        items: 5
      },
      400: {
        items: 5
      },
      500: {
        items: 5
      },

    },
    nav: true
  }
  customOptions2: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    responsive: {
      200: {
        items: 1
      },
      400: {
        items: 1
      },
      500: {
        items: 1
      },

    },
    nav: true
  }

  imagesProducts: Image[] = [];
  currImage: Image;

  minus: boolean = true;
  plus: boolean= false;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              public tokenService: TokenStorageService,
              private navigator: NavigatorService,
              public categoryService: CategoryService,
              private meta: Meta,
              private title: Title,
              private canonicalService: CanonicalService,
              @Inject(DOCUMENT) private document: Document
  ) { }

  destroy$: Subject<void> = new Subject<void>();
  nameRoute: string;
  countRating: number;
  spinner: boolean;
  topProductSearch: ProductDTO[];

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    this.spinner = true;
    this.productService.getTopProductSearch().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.topProductSearch = data;
      }
    )
    setTimeout(() => {
      this.loaded = true;
    }, 200);
    this.cartService.TotalItems.subscribe(
      value => {this.productInCart = value}
    )
    this.filter$ = this.route.paramMap.pipe(
      map((param: ParamMap) => Number(param.get('p_id'))))
    this.filter$.subscribe(param => {
      this.productService.getMetaName(param).subscribe(
        (data) => {
          this.title.setTitle(data[0].titleSeo);
          this.meta.addTags([
            {name: 'robots', content: 'max-image-preview:large'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
            {name: 'robots', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
            {property: 'og:locale', content: 'vi-VN'},
            {property: 'og:type', content: 'website'},
          ])
          this.canonicalService.setOgUrl('og:url');
          this.meta.updateTag(
            {name: 'twitter:card', content: 'summary'}
          )
          data.forEach(d => {
            this.meta.updateTag({name: d.name, content: d.content});
          })
          this.productService.getMetaProperty(param).subscribe(
            (data) => {
              data.forEach(d => {
                this.meta.updateTag({property: d.property, content: d.content});
              })
            }
          )
        }

      )

      //Lấy ra thông tin sản phẩm hiện tại
      this.productService.getProduct(param).pipe(takeUntil(this.destroy$)).subscribe((data) => {
        this.spinner = false;
        this.product = data;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        if (this.product.countRating! < 10){
          this.countRating = Random.getRandomInt(10, 30);
        }else{
          this.countRating = this.product.countRating!;
        }
        this.imagesProducts = data['imageProducts'];
        this.currImage = this.imagesProducts[0];

        this.productService.getListProductSame(data['categoryName']).subscribe(
          (data) => {
            this.productSame = data;
          },
          (error) => {
            console.log(error);
          }
        )
      });
      // Lấy ra các sản phẩm cùng danh mục với sản phẩm hiện tại
      this.productService.getBreakCrumb(param).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.breakCrumb = this.groupBy(data);
        },
        (error) => {
          console.log(error);
        }
      )
    });


  }
  showBar(){
    this.visibleSidebarBottom = true;
  }
  loaded: boolean = false;


  routeDetal(nameProduct: string, id: any){
    this.router.navigate(['/san-pham', this.categoryService.custom(nameProduct), id])
  }

  addToCart(): void{
    if (this.tokenService.isLoggedIn()){
      this.cartService.addItem(new ProductInOrder(this.product, this.count)).subscribe(
        (res) => {
          // console.log(res);
          Swal.fire({
            title: "Thành công",
            text: "Đã thêm 1 sản phẩm vào giỏ hàng",
            icon: "success"
          })
        },
        (error) => {
          console.log(error);
        })
    }else {
      this.router.navigate(['/login']);
    }
  }
  buyNow(){
    if (this.tokenService.isLoggedIn()){
      this.cartService.addItem(new ProductInOrder(this.product, this.count)).subscribe(
        (res) => {
          this.router.navigate(['/gio-hang-cua-ban']);
        },
        (error) => {
          console.log(error);
        })
    }else {
      this.router.navigate(['/login']);
    }
  }

  validateCount(): void{
    const max = this.product.count!;
    if (this.count > max){
      this.count = max;
    }else if (this.count < 1){
      this.count = 1;
    }
  }
  plusCount(): void{
    if (this.count >= this.product.count){
      this.plus = true;
    }else {
      this.count ++;
      this.minus = false;
    }
  }
  minusCount(): void{
    if (this.count == 1){
      this.minus = true;
    }else {
      this.count --;
    }
  }

  carouselImage(id: number){
    this.currImage = this.imagesProducts.find(i => i.id === id)!;
  }

  groupBy(a: any){
    let newArr: any = [];
    if (a?.length > 0){
      let index = a.length;
      for(let i= a.length; i>= 0; i--){
        if (i%2 !== 0){
          newArr.push(a.slice(i-1, index));
          index= i - 1;
        }
      }
      return newArr;
    }
  }

  // hàm  tăng lượt like
  likeProduct(product: Product){
    if (!this.tokenService.isLoggedIn()){
      this.router.navigate(['/login'])
    }
    console.log(product.productId);
    this.heart = true;
  }

  backToPreviousPage(){
    this.navigator.back();
  }

  @HostListener('window: scroll', ['$event'])
  onScroll(){
    if (this.document.documentElement.scrollTop > 300 || window.pageYOffset > 300){
      if (this.document.getElementById("scroll-header")){
        this.document.getElementById("scroll-header")!.style.top = "0";
      }
    } else {
      if (this.document.getElementById("scroll-header")) {
        this.document.getElementById("scroll-header")!.style.top = "-50px";
      }
    }


  }

  routeProductOfCategory(id: string, name: string){
    this.router.navigate(['/', this.categoryService.custom(name), id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
