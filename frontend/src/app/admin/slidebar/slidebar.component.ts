import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {

  @Input() active: boolean;
  @Output() nonActive: EventEmitter<any> = new EventEmitter<any>();
  constructor(private login: TokenStorageService,
              private router: Router) {
  }
  ngOnInit() {

  }
  disActive(){
    this.nonActive.emit();
  }
  logout(){
    this.login.signOut();
    this.router.navigate(['/'])
  }
}
