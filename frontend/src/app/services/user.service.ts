import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AppConstants} from "../common/app.constants";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private token: TokenStorageService) {}

  private isRoles: BehaviorSubject<any> = new BehaviorSubject<any>('');
  setRoles(value: any){
    this.isRoles.next(value);
  }
  public get roles(): Observable<any>{
    return this.isRoles.asObservable();
  }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', {responseType: 'text'});
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', httpOptions);
  }

  getAllInfoUser(): Observable<any>{
    return this.http.get<any>(AppConstants.API_URL + 'user/all');
  }
}
