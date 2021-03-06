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

  // l???y ra 6 s???n ph???m t??m ki???m ph??? bi???n cho thanh search
  public getSixProductBestSearch(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "product/getSixProductBestView",this.httpOptions ).pipe(
      catchError(this.err.handleError)
    );
  }

  // danh s??ch c??c s???n ph???m ???????c t??m th???y tr??n thanh search
  public getProductSearch(textSearch: string, page: number, size:number, sort?: any, price1?: number,price2?: number, categories?: any ): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/getProductSearch?textSearch=${textSearch}&page=${page}&size=${size}&sort=${sort}&price1=${price1}&price2=${price2}&categories=${categories}`);
  }


  // l???y danh s??ch c??c category trong m??n search s???n ph???m
  public getCategoryForSearch(product_id): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/getCategoryForSearch/${product_id}`);
  }

  // l???y th??ng tin ch??nh s??ch b???o h??nh v?? ?????i tr???
  public getPolicy(status: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + `product/getPolicy?status=${status}`, this.httpOptions);
  }

  // t???o th??ng tin v??? ch??nh s??ch b???o h??nh v?? ?????i tr??? h??ng
  public createPolicy(policy: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + "api/createTutorial", policy);
  }

  //X??a s???n ph???m
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
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    str = str.replace(/??|??|???|???|??/g, "I");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    str = str.replace(/???|??|???|???|???/g, "Y");
    str = str.replace(/??/g, "D");
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huy???n, s???c, h???i, ng??, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // m?? ?? (??), m?? ??, m?? ?? (??)

    return str.toLowerCase();
  }

}
