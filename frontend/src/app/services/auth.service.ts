import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConstants} from "../common/app.constants";
import {FormResetPass} from "../models/dto/formResetPass";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn:'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions);
  }

  verify(credentials): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + 'verify', credentials.code,{
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }

  verifyToken(token): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + 'token/verify', token, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }

  verifyTokenResetPassword(data: FormResetPass): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + "token/resetPassword", data)
  }

  resendToken(token): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + 'token/resend', token, {
      headers: new HttpHeaders({'Content-Type': 'text/plain'})
    });
  }

  forgotPassword(form): Observable<any>{
    return this.http.post(AppConstants.AUTH_API + "resetPassword", {
      email: form.email
    });
  }


}
