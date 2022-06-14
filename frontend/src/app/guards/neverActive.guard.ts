import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {CategoryService} from "../services/category.service";
import {Category} from "../models/category";


@Injectable({
  providedIn: 'root'
})
export class NeverActiveGuard implements CanActivate{
  category: Category[] = [];
  active: boolean = false;
  constructor(private router: Router,
              private categoryService: CategoryService
              ) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.categoryService.getAllCateForEdit().subscribe(
      (data) => {
        console.log("never active");
        this.category = data;
        this.category.forEach(
          c => {
            if (route.params['nameCategory'] == this.categoryService.custom(c.categoryName ) && route.params['idCategory'] == c.categoryId){
              this.active = true;
              return true;
            }
          }
        )
        if (!this.active){
          this.router.navigate(["/"]);
          return false;
        }
      }
    )
    return true;
  }

}
