import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {Product} from "../models/product";
import {HttpHandlerErrorService} from "./http-handler-error.service";
import {environment} from "../../environments/environment";
import {ProductDTO} from "../models/dto/ProductDTO";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrl;

  private searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public setSearchText(value: string){
    this.searchText.next(value);
  }
  public getSearchText(): Observable<string>{
    return this.searchText.asObservable();
  }
  private topProductSearch: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public setTopProductSearch(value: any){
    this.topProductSearch.next(value);
  }
  public getTopProductSearch(): Observable<any>{
    return this.topProductSearch.asObservable();
  }

  constructor(private http: HttpClient, private err: HttpHandlerErrorService) { }

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')

  httpOptions = {
    headers: this.headers
  };

  public getAllProduct(sort: string, size?: number, page?: number): Observable<any> {

    return this.http.get<any>(this.baseUrl + `product/getAllProduct?sort=${sort}&size=${size}&page=${page}`, this.httpOptions);
  }

  public getAllProductForUser(sort: string, size?: number, page?: number): Observable<any> {

    return this.http.get<any>(this.baseUrl + `product/getAllProductForUser?sort=${sort}&size=${size}&page=${page}`, this.httpOptions);
  }

  public getProduct(productId: number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + `product/getProduct/${productId}`, this.httpOptions);
  }

  public getProductsByCategoryParent(categoryId: number, page: number, size: number, sort: string, categories?: any, price1?: number,price2?: number): Observable<any>{
    const param = new HttpParams().set("page", page);
    return this.http.get<any>(this.baseUrl + `product/getProductsByCategoryParent/${categoryId}?size=${size}&sort=${sort}&categories=${categories}&price1=${price1}&price2=${price2}`, {params: param});
  }

  public getProductByCategory(categoryId: number): Observable<ProductDTO>{
    return this.http.get<ProductDTO>(this.baseUrl + `product/getProductByCategory/${categoryId}`, this.httpOptions);
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl + "product/addProduct", product);
  }

  public getListProductSame(categoryName: string): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + `product/getListProductSame?categoryName=${categoryName}`, this.httpOptions);
  }

  public getBreakCrumb(productId: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/getBreakCrumb/${productId}`, this.httpOptions);
  }

  public getAllProductByAdmin(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + "product/getAllProductByAdmin");
  }

  public updateProduct(form: any):Observable<any>{
    return this.http.put<any>(this.baseUrl + "product/update", form);
  }

  // lấy ra 6 sản phẩm tìm kiếm phổ biến cho thanh search
  public getSixProductBestSearch(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "product/getSixProductBestView",this.httpOptions ).pipe(
      catchError(this.err.handleError)
    );
  }

  // danh sách các sản phẩm được tìm thấy trên thanh search
  public getProductSearch(textSearch: string, page: number, size:number, sort?: any, price1?: number,price2?: number, categories?: any ): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/getProductSearch?textSearch=${textSearch}&page=${page}&size=${size}&sort=${sort}&price1=${price1}&price2=${price2}&categories=${categories}`);
  }


  // lấy danh sách các category trong màn search sản phẩm
  public getCategoryForSearch(product_id): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/getCategoryForSearch/${product_id}`);
  }

  // lấy thông tin chính sách bảo hành và đổi trả
  public getPolicy(status: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/getPolicy?status=${status}`, this.httpOptions);
  }

  // tạo thông tin về chính sách bảo hành và đổi trả hàng
  public createPolicy(policy: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + "api/createTutorial", policy);
  }

  //Xóa sản phẩm
  public deleteProduct(id: any): Observable<any>{
    return this.http.delete<any>(this.baseUrl + `product/deleteProduct/${id}`);
  }

  public deleteMetaTagName(id: any): Observable<any>{
    return this.http.delete<any>(this.baseUrl + `product/delete/metaTagName/${id}`);
  }

  public deleteMetaTag(id: any): Observable<any>{
    return this.http.delete<any>(this.baseUrl + `product/delete/metaTag/${id}`);
  }

  public getMetaName(product_id: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/metaName/${product_id}`);
  }
  public getMetaProperty(product_id: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/metaProperty/${product_id}`);
  }

  public cleanWord(str: string){
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)

    return str.toLowerCase();
  }

}
