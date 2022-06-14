import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  active: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.active = !this.active;
  }
  disActive(){
    this.active = false;
  }

}
