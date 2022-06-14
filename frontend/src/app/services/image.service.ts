import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Image} from "../models/image";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService{
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllImage(): Observable<Image[]>{
    return this.http.get<Image[]>(this.baseUrl + `image/files`);
  }

  public deleteImageOfProduct(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + `image/${id}`);
  }

  public getImageByStatus(status: any): Observable<any>{
    return this.http.get<any>(this.baseUrl + `image/getByStatus?status=${status}`, );
  }
}
