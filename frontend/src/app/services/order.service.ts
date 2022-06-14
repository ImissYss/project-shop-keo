import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OrderService{
  private baseUrl = environment.baseUrl;

  private statusVirtual: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public get getStatusVirtual(): Observable<string>{
    return this.statusVirtual.asObservable();
  }

  setStatusVirtual(value: string){
    this.statusVirtual.next(value);
  }

  constructor(private http: HttpClient) {
  }

  // public getAllOrderByAdmin(page: number, size: number, sort: string, status: String[], createTime?: String): Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}/getAllOrder?page=${page}&size=${size}&sort=${sort}&status=${status}&createTime=${createTime}`);
  // }
  public getAllOrderByAdmin(): Observable<any>{
    return this.http.get<any>(this.baseUrl + "order/getAllOrder");
  }

  public confirmOrder(orderId: number): Observable<HttpEvent<any>>{
    const req = new HttpRequest('PUT', this.baseUrl + `order/confirmOrder/${orderId}`, {
      reportProgress: true,
      responseType: 'json'
    });
    this.setStatusVirtual('1');

    return this.http.request(req);
  }

  public cancelOrder(orderId: number): Observable<HttpEvent<any>>{
    const req = new HttpRequest('PUT', this.baseUrl + `order/cancelOrder/${orderId}`,{
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
