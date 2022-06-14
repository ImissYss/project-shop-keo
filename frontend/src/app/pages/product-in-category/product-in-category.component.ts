import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {lastValueFrom, Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {PrimeNGConfig} from "primeng/api";
import {ProductService} from "../../services/product.service";
import {NavigatorService} from "../../services/navigator.service";
import {Category} from "../../models/category";
import {Product} from "../../models/product";
import {Meta, Title} from "@angular/platform-browser";
import {CanonicalService} from "../../services/canonical.service";
import {ProductDTO} from "../../models/dto/ProductDTO";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-product-in-category',
  templateUrl: './product-in-category.component.html',
  styleUrls: ['./product-in-category.component.scss'],
})
export class ProductInCategoryComponent implements OnInit, OnDestroy {

  visibleSidebarBottom = false;
  spinner: boolean;
  showBar(){
    this.visibleSidebarBottom = true;
  }

  mobile
  state: string = '0';
  categoryNameCurr: string = 'Tất cả';
  visibleSidebarSort =false;
  sortOptionMobile: string;
  stateOptionMobile: any[] = [];


  products: ProductDTO[];
  productsFilter: ProductDTO[];
  stateOptions: any[];

  page = 1;
  count = 0;
  pageSize = 20;
  totalPages = 0;

  categoryId: string;
  listCategoryChild: Category[];
  themes: any[] = [];
  sortValue: string = "product_id,desc";
  sortRice: string;

  sortOptions = ['cao đến thấp', 'thấp đến cao'];
  categoryName: string;
  cateId: any;

  price1 = 0;
  price2 = 50000000;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private primeNGConfig: PrimeNGConfig,
              private productService: ProductService,
              private navigator: NavigatorService,
              private router: Router,
              private changeDetectionRef: ChangeDetectorRef,
              private meta: Meta,
              private title: Title,
              private canonicalService: CanonicalService,
              @Inject(DOCUMENT) private document: Document
  ) {
    this.stateOptions = [
      { label: "Liên quan", value: "product_id,desc" },
      { label: "Mới nhất", value: "update_time,desc" },
      { label: "Bán chạy", value: "sold,desc"},
    ];
    this.stateOptionMobile = [
      {label: 'Bán chạy', value: "sold,desc"},
      {label: 'Mới nhất', value: "update_time,desc"},
      {label: 'Giá thấp nhất', value: "product_price,asc"},
      {label: 'Giá cao nhất', value: "product_price,desc"}
    ]
  }

  ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

  sortProductMobile(value: any){
    this.sortValue = value;
    this.getProductOfPage();
    this.visibleSidebarSort = false;
  }
  ngOnInit(): void {
    this.spinner = true;
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    this.meta.addTags([
      {name: 'robots', content: 'max-image-preview:large'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
      {name: 'robots', content: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
      {property: 'og:locale', content: 'vi-VN'},
      {property: 'og:type', content: 'website'},
    ])

    // this.canonicalService.setCanonicalURL();
    this.canonicalService.setOgUrl('og:url');
    // this.canonicalService.setOgUrl('og:site_name', 'TP Shop');
    this.meta.updateTag(
      {name: 'twitter:card', content: 'summary'}
    )

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((param) => {
      this.categoryName = param['nameCategory'];
      this.cateId = param['idCategory'];
      this.loadCategoryById(param["idCategory"]);
    });

    this.getProductOfPage();
  }

  public loadCategoryById(id: any){
    this.categoryService.getMetaName(id).subscribe(
      (data) => {
        this.title.setTitle(data[0].titleSeo);
        data.forEach(d => {
          this.meta.updateTag({name: d.name, content: d.content});
        })
      }
    )
    this.categoryService.getMetaProperty(id).subscribe(
      (data) => {
        data.forEach(d => {
          this.meta.updateTag({property: d.property, content: d.content});
        })
      }
    )
    this.categoryService.getCategoryById(id).subscribe(
      (data) => {
        this.listCategoryChild = data;
      }
    );
  }

  getProductOfPage(): void{
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((param) =>{
      this.productService.getProductsByCategoryParent(param["idCategory"], this.page - 1, this.pageSize, this.sortValue, this.themes, this.price1, this.price2).subscribe(
        (data) => {
          const {products, totalItems, totalPages} = data;
          this.products = products;
          this.count = totalItems;
          this.totalPages = totalPages;
          this.spinner = false;
        }
      )
    });
  }

  handlePageChange(event: number): void{
    // this.page = event;
    this.router.navigate(['/' + this.categoryName + '/' + this.cateId], {queryParams: {page: event}});
    this.page = event;
    this.getProductOfPage();
  }

  sortOption(){
    this.visibleSidebarSort = true;
  }


  filterCategory(id: string){
    if (this.themes.some(a => a === id)){
      this.themes = this.themes.filter(a => a !== id);
    } else {
      this.themes.push(id);
    }
    this.getProductOfPage();

  }

  filterCategoryMobile(id: string, name: string){
    this.categoryNameCurr = name;
    if (this.themes.length > 0){
      this.themes = [];
    }
    this.themes.push(id);
    this.state = id;
    this.getProductOfPage();
  }

  filterTotalProduct(){
    this.themes = [];
    this.state = '0';
    this.getProductOfPage();
    this.categoryNameCurr = 'Tất cả'
  }



  sortPrice(): void{
    if (this.sortRice === "cao đến thấp"){
      this.sortValue = "product_price,desc";
      this.getProductOfPage();
    }else if (this.sortRice === "thấp đến cao"){
      this.sortValue = "product_price,asc";
      this.getProductOfPage();
    }
  }

  sortProduct(): void{
    this.getProductOfPage();
  }

  filterPrice(): void{
    this.getProductOfPage();
  }


  backToPreviousPage(){
    this.navigator.back();
  }

}
