import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {ProductInOrder} from "../models/productInOrder";
import {TokenStorageService} from "./token-storage.service";
import {Address} from "../models/address";
import {Order} from "../models/order";
import {JwtResponse} from "../message/JwtResponse";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
  }
)
export class CartService {

  private baseUrl = environment.baseUrl;
  productInCart: Array<ProductInOrder> = [];

  private totalItems: BehaviorSubject<string> = new BehaviorSubject<string>('0');
  public get TotalItems(): Observable<string>{
    return this.totalItems.asObservable();
  }
  setTotal(value: string){
    this.totalItems.next(value);
    this.total = Number(this.totalItems.getValue());
  }
  total: number = 0;

  private currentUser: JwtResponse;
  private itemsSubject = new BehaviorSubject<ProductInOrder[]| null>(null);
  public get ItemsSubject(): Observable<ProductInOrder[]|null> {
    return this.itemsSubject.asObservable();
  }
  setItemsSubject(value: any){
    this.itemsSubject.next(value);
    this.productInCart = this.itemsSubject.getValue()!;
  }

  constructor(private http: HttpClient,
              private userService: UserService,
              private tokenService: TokenStorageService) {
  }

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')

  httpOptions = {
    headers: this.headers
  };

  getCart(): Observable<ProductInOrder[]>{
    return this.http.get<ProductInOrder[]>(this.baseUrl + "cart", this.httpOptions);
  }

  addItem(productInOrder): Observable<boolean>{
    this.getCart().subscribe(data =>{
      if (data['products'].length === 0 || data['products'].find(d => d.productId === productInOrder.productId) == null){
        this.total ++;
        this.totalItems.next(String(this.total));
        this.productInCart.push(productInOrder);
        this.itemsSubject.next(this.productInCart);
      }

    })

    return this.http.post<boolean>(this.baseUrl + "cart/add", {'quantity': productInOrder.count,'productId': productInOrder.productId})
  }

  update(productInOrder): Observable<ProductInOrder>{
    if (this.tokenService.isLoggedIn()) {
      return this.http.put<ProductInOrder>(this.baseUrl +`cart/update/${productInOrder.productId}`,productInOrder.count);
    }
    return productInOrder;
  }
  updateStatus(productInOrder): Observable<ProductInOrder>{
    if (this.tokenService.isLoggedIn()){
      return this.http.put<ProductInOrder>(this.baseUrl + `cart/updateStatus/${productInOrder.productId}`, productInOrder.status);
    }
    return productInOrder;
  }

  remove(productInOrder: ProductInOrder){
    if (this.tokenService.isLoggedIn()){
      this.total--;
      this.productInCart.splice(this.productInCart.indexOf(productInOrder));
      this.itemsSubject.next(this.productInCart);
      this.totalItems.next(String(this.total));
      return this.http.delete(this.baseUrl + `cart/${productInOrder.productId}`);
    }
  }

  createOrder(address: Address): Observable<Order>{
    return this.http.post<Order>(this.baseUrl + `cart/createOrder`, address);
  }

  getOrder(id: number): Observable<Order>{
    return this.http.get<Order>(this.baseUrl + `cart/getOrder/${id}`, this.httpOptions);
  }

  getAllOrder(): Observable<Order[]>{
    return this.http.get<Order[]>(this.baseUrl + `cart/getAllOrder`, this.httpOptions);
  }
}
