import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {StateKey, TransferState} from "@angular/platform-browser";
import {map, Observable, startWith} from "rxjs";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor(@Inject(PLATFORM_ID)private platformId: object, private transferState: TransferState) {

  }
  getCachedObservable($datasource: Observable<any>, dataKey: StateKey<any>){
    if (isPlatformServer(this.platformId)){
      return $datasource.pipe(map(data => {
        this.transferState.set(dataKey, data);
        return data;
      }))
    }else if (isPlatformBrowser(this.platformId)){
      const saveValue = this.transferState.get(dataKey, null);
      const observableToReturn = saveValue? $datasource.pipe(startWith(saveValue)) : $datasource;
      return observableToReturn;
    }
  }

}
