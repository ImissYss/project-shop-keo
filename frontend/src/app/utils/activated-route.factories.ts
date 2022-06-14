import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";

export function routeParamFactory(
  paramKey: string
): (route: ActivatedRoute) => Observable<string | null>{
  return (route: ActivatedRoute): Observable<string|null> =>{
    return route.paramMap.pipe(map(param => param.get(paramKey)));
  }
}


export function routeParamSnapshotFactory(
  paramKey: string
): (route: ActivatedRoute) => string|null{
  return (route: ActivatedRoute): string | null =>{
    return route.snapshot.paramMap.get(paramKey);
  }
}

export function queryParamFactory(
  paramKey: string
): (route: ActivatedRoute) => Observable<string | null>{
  return (route: ActivatedRoute): Observable<string | null> => {
    return route.queryParamMap.pipe(map(param => param.get(paramKey)));
  }
}

export function queryParamSnapshotFactory(
  paramKey: string
): (route: ActivatedRoute) => string | null {
  return (route: ActivatedRoute): string|null => {
    return route.snapshot.queryParamMap.get(paramKey);
  }
}
