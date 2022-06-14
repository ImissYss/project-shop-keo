import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {StateKey, TransferState} from "@angular/platform-browser";
import {map, Observable, startWith} from "rxjs";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MakeStateKeyService{

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private transferState:  TransferState) {
  }

  getCachedObservable($dataSource: Observable<any[]>, dataKey: StateKey<any>) {
    if (isPlatformServer(this.platformId)) {
      return $dataSource.pipe(map(datum => {
        this.transferState.set(dataKey, datum);
        return datum;
      }));
    } else if (isPlatformBrowser(this.platformId)) {
      const savedValue = this.transferState.get(dataKey, null);
      const observableToReturn = savedValue ? $dataSource.pipe(startWith(savedValue)) : $dataSource;
      return observableToReturn;
    }
  }

}
