import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {map, Observable} from "rxjs";
import {CategoryService} from "../../../services/category.service";
import {PrimeNGConfig} from "primeng/api";
import {ProductService} from "../../../services/product.service";
import {NavigatorService} from "../../../services/navigator.service";
import {Category} from "../../../models/category";
import {Product} from "../../../models/product";
import {ProductDTO} from "../../../models/dto/ProductDTO";

@Component({
  selector: 'app-template-product-result',
  templateUrl: './template-product-result.component.html',
  styleUrls: ['./template-product-result.component.scss']
})
export class TemplateProductResultComponent implements OnInit {



  spinner: boolean;
  searchText: string = '';
  titleProductSearch: string;

  visibleSidebarBottom = false;
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
  pageSize = 15;
  totalPages = 0;

  categoryId: number;
  listCategoryChild: Category;
  themes: any[] = [];
  sortValue: any = null;
  sortRice: string;

  sortOptions = ['cao đến thấp', 'thấp đến cao'];

  price1 = 0;
  price2 = 50000000;

  //danh sách các category (lấy name+id)
  categoryForSearch: Category[] = [];
  filterCate: boolean = false;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private primeNGConfig: PrimeNGConfig,
              private productService: ProductService,
              private navigator: NavigatorService) {
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

  sortProductMobile(value: any){
    this.sortValue = value;
    this.getProductOfPage(this.my_Levenshtein_level_one(this.searchText, this.searchText));
    this.visibleSidebarSort = false;
  }
  my_Levenshtein_level_one(word: string, key){
    return word;
  }

  filter$: Observable<any>;
  fulltext: string = '';
  firstProductId: number;

  ngOnInit(): void {
    this.spinner = true;
    this.filter$ = this.route.queryParamMap.pipe(
      map((param: ParamMap) => param.get('keyword'))
    )
    this.filter$.subscribe(
      (data) => {
        this.searchText = data;
        this.fulltext = this.my_Levenshtein_level_one(data, data);
        this.getProductOfPage(this.fulltext);
        this.spinner = false;
      }
    )
  }

  getProductOfPage(fulltextt: string): void{
    this.productService.getProductSearch(fulltextt, this.page - 1,this.pageSize, this.sortValue!, this.price1, this.price2, this.themes).subscribe(
      (data) => {
        const {products, totalItems, totalPages} = data;
        this.products = products;
        this.count = totalItems;
        this.totalPages = totalPages;
        if (!this.filterCate){
          if (this.products.length == 0){
            this.categoryForSearch = [];
          }else{
            this.productService.getCategoryForSearch(this.products[0].productId).subscribe(
              (data) => {
                this.categoryForSearch = data;
              }
            )
          }
        }

      }
    )

  }

  handlePageChange(event: number): void{
    this.page = event;
    this.getProductOfPage(this.searchText);
  }

  sortOption(){
    this.visibleSidebarSort = true;
  }

  filterCategory(id: string){
    console.log("filter-category");
    this.filterCate = true;
    if (this.themes.some(a => a === id)){
      this.themes = this.themes.filter(a => a !== id);
    } else {
      this.themes.push(id);
    }
    this.getProductOfPage(this.my_Levenshtein_level_one(this.searchText, this.searchText));
  }

  filterCategoryMobile(id: string, name: string){
    this.categoryNameCurr = name;
    if (this.themes.length > 0){
      this.themes = [];
    }
    this.themes.push(id);
    this.state = id;
    this.getProductOfPage(this.my_Levenshtein_level_one(this.searchText, this.searchText));
  }

  filterTotalProduct(){
    this.themes = [];
    this.state = "0";
    this.getProductOfPage(this.searchText);
    this.categoryNameCurr = 'Tất cả'
  }

  sortPrice(): void{
    if (this.sortRice === "cao đến thấp"){
      this.sortValue = "product_price,desc";
      this.getProductOfPage(this.my_Levenshtein_level_one(this.searchText, this.searchText));
    }else if (this.sortRice === "thấp đến cao"){
      this.sortValue = "product_price,asc";
      this.getProductOfPage(this.my_Levenshtein_level_one(this.searchText, this.searchText));
    }
  }

  sortProduct(): void{
    this.getProductOfPage(this.my_Levenshtein_level_one(this.searchText, this.searchText));
  }

  filterPrice(): void{
    this.getProductOfPage(this.my_Levenshtein_level_one(this.searchText, this.searchText));
  }

  backToPreviousPage(){
    this.navigator.back();
  }

}
