import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    const req = new HttpRequest('POST', this.baseUrl + "image/upload", formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFile(): Observable<any> {
    return this.http.get(this.baseUrl + "image/files");
  }

}
