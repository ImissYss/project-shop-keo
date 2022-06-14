import {Injectable} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class NavigatorService{
  public history: string[] = [];
  public historyCopy: any[] = [];

  constructor(private router: Router,private location: Location ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.history.push(event.urlAfterRedirects);
      }
    })
  }

  back(): void{
    this.history.pop()
    if (this.history.length > 0) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }
}
