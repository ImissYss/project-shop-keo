import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user";



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() user: User;
  sex

  constructor() { }

  ngOnInit(): void {

  }

}
