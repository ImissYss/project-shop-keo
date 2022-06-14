import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ProductService} from "../../services/product.service";
import {HttpClient} from "@angular/common/http";
import {OwlOptions} from "ngx-owl-carousel-o";
import {Meta, Title} from "@angular/platform-browser";
import {CanonicalService} from "../../services/canonical.service";
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../../environments/environment";
import {ProductDTO} from "../../models/dto/ProductDTO";
import {SpinnerService} from "../../services/spinner.service";
import {ShopInfoService} from "../../services/shopInfo.service";
import {Infoshop} from "../../models/infoshop";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit , OnDestroy{

  headerHome = true;
  //biến để lấy ra danh sách sản phẩm theo xu hướng
  topSearchProducts: any[] = [];
  sort: string = "sold,desc";
  pageSize = 20;
  page = 1;
  title = "Xu hướng tìm kiếm";
  viewCarousel1 = true;


  page1 = 1;
  count1 = 0;
  pageSize1 = 24;
  totalPages = 0;
  sort1: string = "create_time,desc";
  products: ProductDTO[] = [];
  titleProductList = "Gợi ý hôm nay";


  images: any[] = [];
  customOptions1: OwlOptions = {
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
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  customOptions: OwlOptions = {
    loop: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  titleSeo: string = 'Kéo cắt tóc - tp shop';
  destroy$: Subject<void> = new Subject<void>();
  loaded: boolean = false;

  constructor(private categoryService: CategoryService, private http: HttpClient,
              public login: TokenStorageService,
              private productService: ProductService,
              private metaTagService: Meta,
              private canonicalService: CanonicalService,
              private titleService: Title,
              private infoShop: ShopInfoService,
              private spinnerService: SpinnerService) { }

  spinner: boolean = true;

  ngOnInit(): void {
    this.spinner = true;
    this.titleService.setTitle(this.titleSeo);
    this.metaTagService.updateTag({name: 'description', content: 'Kéo cắt tóc, tông đơ cắt tóc luôn là người bạn đồng hành không thể thiếu đối với một người' +
        'thợ cắt tóc dù là nam hay nữ. Vì vậy, người thợ cắt tóc ai cũng muốn sở hữu cho mình một bộ kéo, tông đơ chất' +
        'lượng. Đến với TP Shop, chúng tôi sẽ mang đến cho bạn những loại kéo cao cấp, tông đơ cao cấp được nhập khẩu' +
        'chính hãng. Với cam kết về kéo cắt tóc chất lượng tốt nhất,giao hàng tận nhà trên mọi miền tổ quốc. Hãy liên hệ' +
        'với chúng tôi sớm nhất để nhận ưu đãi'})
    this.canonicalService.setCanonicalURL(environment.baseUrl);
    this.metaTagService.addTags([
      {name: 'robots', content: 'max-image-preview:large'},
      // {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
      {name: 'robots', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
      {name: 'keywords', content: 'kéo cắt tóc, dụng cụ cắt tóc, tp shop, tông đơ cắt tóc'},
      {name: 'author', content: 'tp shop'},
      {property: 'og:locale', content: 'vi-VN'},
      {property: 'og:type', content: 'website',},
      {property: 'og:title', content: 'Kéo cắt tóc, Tông đơ cắt tóc - TP Shop'},
      {property: 'og:description', content: 'Kéo cắt tóc, tông đơ cắt tóc luôn là người bạn đồng hành không thể thiếu đối với một người' +
          'thợ cắt tóc dù là nam hay nữ. Vì vậy, người thợ cắt tóc ai cũng muốn sở hữu cho mình một bộ kéo, tông đơ chất' +
          'lượng. Đến với TP Shop, chúng tôi sẽ mang đến cho bạn những loại kéo cao cấp, tông đơ cao cấp được nhập khẩu' +
          'chính hãng. Với cam kết về kéo cắt tóc chất lượng tốt nhất,giao hàng tận nhà trên mọi miền tổ quốc. Hãy liên hệ' +
          'với chúng tôi sớm nhất để nhận ưu đãi'},
    ])
    this.canonicalService.setOgUrl('og:url');
    // this.canonicalService.setOgUrl('og:site_name', 'TP Shop');
    this.metaTagService.updateTag(
      {name: 'twitter:card', content: 'summary'}
    )
    this.metaTagService.updateTag(
      {name: 'twitter:description', content: 'Kéo cắt tóc, tông đơ cắt tóc luôn là người bạn đồng hành không thể thiếu đối với một người' +
          'thợ cắt tóc dù là nam hay nữ. Vì vậy, người thợ cắt tóc ai cũng muốn sở hữu cho mình một bộ kéo, tông đơ chất' +
          'lượng. Đến với TP Shop, chúng tôi sẽ mang đến cho bạn những loại kéo cao cấp, tông đơ cao cấp được nhập khẩu' +
          'chính hãng. Với cam kết về kéo cắt tóc chất lượng tốt nhất,giao hàng tận nhà trên mọi miền tổ quốc. Hãy liên hệ' +
          'với chúng tôi sớm nhất để nhận ưu đãi'}
    )
    this.metaTagService.updateTag(
      {name: 'twitter:title', content: 'Kéo cắt tóc - tp shop'}
    )
    infoShop: Infoshop;
    this.infoShop.getTotalInfoShop().subscribe(
      data => {
        this.infoShop = data;
        this.images = data['imgDescription'];
      }
    )
    this.getProductOfPage();
  }


  // lấy danh sách tất cả các sản phẩm
  getProductOfPage(): void{
    this.productService.getAllProduct(this.sort1, this.pageSize1, this.page1 - 1).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        const {products, totalItems, totalPages} = data;
        this.products = products;
        this.count1 = totalItems;
        this.totalPages = totalPages;
        this.products.forEach(p => this.topSearchProducts.push(Object.assign({}, p)));
        this.topSearchProducts .sort((a,b) => a.viewCount < b.viewCount? -1 : 1);
        this.productService.setTopProductSearch(this.topSearchProducts);
        this.spinner = false;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handlePageChange(event: number): void{
    this.page1 = event;
    this.getProductOfPage();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
