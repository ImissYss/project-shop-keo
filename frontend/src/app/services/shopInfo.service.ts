import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ShopInfoService{
  private baseUrl = environment.baseUrl;

  private totalInfoShop: BehaviorSubject<any> = new BehaviorSubject<any>('');
  setInfoShop(value: any){
    this.totalInfoShop.next(value);
  }
  public getTotalInfoShop(): Observable<any>{
    return this.totalInfoShop.asObservable();
  }

  constructor(private http: HttpClient) {
  }

  public createInfoShop(form: any): Observable<any>{
    return this.http.post<any>(this.baseUrl + "infoShop/createInfoShop", form);
  }

  public getInfoShop(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "infoShop/getAllInfoShop");
  }

  public updateInfoShop(form: any): Observable<any>{
    return this.http.put<any>(this.baseUrl + "infoShop/updateInfoShop", form);
  }
}
