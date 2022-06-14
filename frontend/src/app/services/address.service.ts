import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Address} from "../models/address";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AddressService{
  private baseUrl = environment.baseUrl

  addresses: Address[] | null = [];
  private option: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public getOption(): Observable<string>{
    return this.option.asObservable();
  }
  setOption(value:string){
    this.option.next(value);
  }

  private listAddress = new BehaviorSubject<Address[] | null>(null);
  public getListAddress(): Observable<Address[] | null>{
    return this.listAddress.asObservable();
  }
  setListAddress(value: any){
    this.listAddress.next(value);
    this.addresses = this.listAddress.getValue();
  }

  constructor(private http: HttpClient) {
  }

  public getAllCities(): Observable<any>{
    return this.http.get<any>(this.baseUrl+ "address/province");
  }

  public getDistrictsByProvince(provinceId: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + `address/district/${provinceId}`);
  }

  public getWardByDistrict(districtId: number): Observable<any>{
    return this.http.get<any>(this.baseUrl + `address/ward/${districtId}`);
  }

  public createAddress(address: Address): Observable<Address>{
    this.addresses?.push(address);
    this.listAddress.next(this.addresses);
    return this.http.post<any>(this.baseUrl + "address/addAddress", address);
  }

  public getAllAddress(): Observable<Address[]>{
    return this.http.get<Address[]>(this.baseUrl + "address/getAddress");
  }

  public deleteAddress(addressId: number): Observable<any>{
    return this.http.delete<any>(this.baseUrl + `address/deleteAddress/${addressId}`);
  }

}
