import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";
import {Observable} from "rxjs";
import {AppConstants} from "../common/app.constants";
import {HttpClient} from "@angular/common/http";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private http: HttpClient) {}

  signOut(): void {
    if (isPlatformBrowser(this.platformId)){
      sessionStorage.clear();
    }
  }

  public saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)){
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.setItem(TOKEN_KEY, token);
    }

  }

  public getToken(): string {
    if (isPlatformBrowser(this.platformId)){
      return <string>sessionStorage.getItem(TOKEN_KEY);
    }
    return '';

  }

  public saveUser(user): void {
    if (isPlatformBrowser(this.platformId)){
      sessionStorage.removeItem(USER_KEY);
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

  }

  public getUser(): any {
    if (isPlatformBrowser(this.platformId)){
      return JSON.parse(<string>sessionStorage.getItem(USER_KEY));
    }
    return null;

  }

  public isLoggedIn(){
    if (isPlatformBrowser(this.platformId)){
      let token = sessionStorage.getItem(TOKEN_KEY);
      if (token == '' || token == undefined || token == null){
        return false;
      }
      return true;
    }
    return false;

  }

}
