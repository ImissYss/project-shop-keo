import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {HttpHandlerErrorService} from "./http-handler-error.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  baseUrl = environment.baseUrl

  cleanAccents (str: string): string {
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

  public custom(nameCategory: string){
    return this.cleanAccents(nameCategory).split(' ').join('-');
  }

  constructor(private http: HttpClient,
              private err: HttpHandlerErrorService) {}

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', '*')


  httpOptions = {
    headers: this.headers
  };

  public getAllCategory(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "category/getAllCategory", this.httpOptions).pipe(catchError(this.err.handleError));
  }

  public getCategoryById(categoryId: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + `category/getCategory/${categoryId}`, this.httpOptions).pipe(
      catchError(this.err.handleError)
    );
  }

  public getCategoryChild(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "category/getCategoryInfo");
  }

  public getCategoryParent(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "category/getAllCategoryParent", this.httpOptions);
  }

  public addCategory(category): Observable<any>{
    return this.http.post<any>(this.baseUrl + "category/addCategory", category);
  }

  public getAllCateForEdit(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "category/getAllCategoryForEdit");
  }

  public updateCategory(form: any): Observable<any>{
    return this.http.put<any>(this.baseUrl + "category/update", form);
  }
  public getMetaName(category_id: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + `category/metaName/${category_id}`);
  }
  public getMetaProperty(category_id: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + `category/metaProperty/${category_id}`);
  }

  public deleteCategory(category_id: any): Observable<any>{
    return this.http.delete<any>(this.baseUrl + `category/deleteCategory/${category_id}`);
  }
}
