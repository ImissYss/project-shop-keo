import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-bottom',
  templateUrl: './sidebar-bottom.component.html',
  styleUrls: ['./sidebar-bottom.component.scss']
})
export class SidebarBottomComponent implements OnInit {

  constructor(private login : TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  goProfile(){
    if (this.login.isLoggedIn()){
      this.router.navigate(['/profileMobile']);
    }else{
      this.router.navigate(['/login']);
    }
  }
  goCart(){
    if (this.login.isLoggedIn()){
      this.router.navigate(['/gio-hang-cua-ban']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
