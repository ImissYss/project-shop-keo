import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ReadingJsonService {

  private _jsonURL = 'assets/dvhcvn.json';

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
}
