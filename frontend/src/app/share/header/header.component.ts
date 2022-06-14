import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit, PLATFORM_ID
} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

import {ProductInOrder} from "../../models/productInOrder";
import {Category} from "../../models/category";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {AddressService} from "../../services/address.service";
import {map, Observable, startWith, Subject, take, takeUntil} from "rxjs";
import {makeStateKey, TransferState} from "@angular/platform-browser";
import {CartService} from "../../services/cart.service";
import {MakeStateKeyService} from "../../services/makeStateKey.service";
import {ShopInfoService} from "../../services/shopInfo.service";
import {Infoshop} from "../../models/infoshop";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Input() headerHome: boolean;
  @Input() baseIndex: number;
  @Input() show: boolean;

  listCategory: any[];
  notification: string = "0";
  notifications: any[] = [];
  viewNotification = false;
  visibleSidebar1 = false;
  sixProduct: Product[] = [];
  showDropdown = false;
  viewCart = false;
  viewUserAction = false;
  products: ProductInOrder[]| null;

  numberProductOfCart: string;
  categoriesSearch: Category[] = [];
  public search = '';
  productSearchs: Product[] = [];
  seemore = false;
  showSeemorebtn = true;
  showCollapsebtn = false;
  showCategoryHot  = true;

  changeText = false;
  hiddenText = false;
  childCategory: any[];
  infoShop: Infoshop;

  constructor(public categoryService: CategoryService,
              public login: TokenStorageService,
              private productService: ProductService,
              private router: Router,
              private cartService: CartService,
              private eRef: ElementRef,
              private optionService: AddressService,
              private transferState: TransferState,
              @Inject(PLATFORM_ID)private platformId: object,
              private makeKeyService: MakeStateKeyService,
              private infoShopService: ShopInfoService

  ) { }

  destroy$: Subject<void> = new Subject<void>();
  sixProduct$: Observable<any[]>;

  ngOnInit(): void {
    const category$ = this.makeKeyService.getCachedObservable(this.categoryService.getAllCategory(), makeStateKey('GET/getallcategory'))!;
    category$.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        this.categoriesSearch = data;
        this.listCategory = data;
        this.over2(data[0].categoryId);
      },
      (error)=>{console.log(error)}
    )

    this.sixProduct$ = this.makeKeyService.getCachedObservable(this.productService.getSixProductBestSearch(), makeStateKey('GET/sixProduct'))!;

    if (this.login.isLoggedIn()){
      this.cartService.TotalItems.subscribe(result => {
        this.numberProductOfCart = result;
      })
      this.cartService.ItemsSubject.subscribe(result => {
        this.products = result;
      })
      this.cartService.getCart().subscribe(result => {
        this.numberProductOfCart = result['products'].length;
        this.cartService.setTotal(this.numberProductOfCart);
        this.products = result['products'];
        this.cartService.setItemsSubject(this.products);
      })
    }else {
      this.numberProductOfCart = '0';
    }

    this.infoShopService.getInfoShop().subscribe(
      (data)=> {
        this.infoShop = data[0];
        this.infoShopService.setInfoShop(data[0]);
      }
    );
  }


  logout(){
    this.login.signOut();
    this.cartService.setTotal("0");
    this.cartService.setItemsSubject(null);
    // this.router.navigate(['login']);
  }

  over(): void{
    this.viewCart = true;
  }

  leave(): void{
    this.viewCart = false;
  }

  overUserAction(): void{
    this.viewUserAction = true;
  }

  leaveUserAction(): void{
    this.viewUserAction = false;
  }

  @HostListener('document: click', ['$event'])
  openDropDown(event){
    if (this.eRef.nativeElement.contains(event.target) && (event.target.id === 'search' || event.target.id === 'see'
      || event.target.id === 'see1' || event.target.id === 'see2' || event.target.id === 'see3' || event.target.id === 'deleteSearchItem'
      || event.target.id === 'deleteSearchItem2')){
      this.showDropdown = true;
    }else {
      this.showDropdown = false;
    }
    if (event.target.id === 'bar' || event.target.id === 'side' || event.target.ariaModal === "false"){
      this.visibleSidebar1 = true;
    }else{
      this.visibleSidebar1 = false;
    }

    if (event.target.id == 'li-ca' || event.target.id == 'cate' || event.target.id == 'cate1'){
      this.showCate = true;
    }else{
      this.showCate = false;
    }
  }

  seeMore(event){
    this.seemore = true;
    setTimeout(() => {
      this.showSeemorebtn = false;
      this.showCollapsebtn = true;
    },10);

  }

  collapse(event){
    this.seemore = false;
    setTimeout(() => {
      this.showSeemorebtn = true;
      this.showCollapsebtn = false;
    }, 10);
  }

  loadAllCategory(){
    this.showCollapsebtn = false;
    this.showSeemorebtn = false;
    this.showCategoryHot = false;
    this.seemore = true;
    if (this.search === ''){
      this.showSeemorebtn = true;
      this.seemore = false;
      this.showCategoryHot = true;

    }
  }

  searchProduct(){
    this.router.navigate(['/search'], {queryParams: {keyword: this.productService.cleanWord(this.search)}});
    console.log("text search")
    console.log(this.productService.cleanWord(this.search));
  }

  hiddenCategoryName(categoryId: any){
    setTimeout(() => {
      this.categoriesSearch = this.categoriesSearch.filter(c => c.categoryId !== categoryId);
    },10);


  }

//  ẩn khung hiện thông báo
  hiddenNotification(){
    this.viewNotification = false;
  }

  overNotification(){
    this.viewNotification = true;
  }

  sideBar(){
    this.visibleSidebar1 = true;
    this.show = false;
  }

  routeProductOfCategory(id: any, name: string){
    this.router.navigate(['/', this.categoryService.custom(name), id]);
  }

  scrollTop(nameProduct: string, id: any){
    this.router.navigate(['/san-pham', this.categoryService.custom(nameProduct), id])
    document.body.animate({scrollTop: 0}, 500);
    document.documentElement.scrollTop = 0;
  }

  // profile mobile
  profile(){
    if (!this.login.isLoggedIn()){
      this.router.navigate(['/login']);
    }else {
      this.router.navigate(['/profileMobile']);
    }
  }

  goProfile(){
    this.optionService.setOption('profile');
    if (this.login.isLoggedIn()){
      this.router.navigate(['/ho-so'], {queryParams: {type: 'profile'}});
    }else{
      this.router.navigate(['/login']);
    }

  }

  goListOrder(){
    this.optionService.setOption('listOrder');
    if (this.login.isLoggedIn()){
      this.router.navigate(['/ho-so'], {queryParams: {type: 'danh-sach-don-hang'}});
    }else{
      this.router.navigate(['/login'])
    }

  }

  state: string;
  over2(id: string): void {
    this.childCategory = this.categoriesSearch.find(c => c.categoryId === id)!.children;
    this.state = id;
  }

  showCate: boolean = false;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
