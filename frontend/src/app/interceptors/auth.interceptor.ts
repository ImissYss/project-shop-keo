import {HTTP_INTERCEPTORS, HttpEvent, HttpResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import {Observable, tap} from 'rxjs';
import {SpinnerService} from "../services/spinner.service";
import {DOCUMENT} from "@angular/common";

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,
              private router: Router,
              private spinnerService: SpinnerService,
              @Inject(DOCUMENT) private document: Document ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.token.getToken()
    let authReq = req;
    if (token != null) {
      authReq = authReq.clone({

        setHeaders: {Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*'}
      });
    }
    this.spinnerService.requestStarted();
    return next.handle(authReq);

  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
