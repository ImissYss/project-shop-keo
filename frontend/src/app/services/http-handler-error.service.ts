import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerErrorService {
  constructor() {
  }
  public handleError(err: HttpErrorResponse): Observable<never>{
    let displayMessage = '';
    if (err.error instanceof ErrorEvent){
      displayMessage = `client-side error ${err.error.message}`;
    }else{
      displayMessage = `serve-side error ${err.error.message}`;
    }
    return throwError(displayMessage);
  }
}
