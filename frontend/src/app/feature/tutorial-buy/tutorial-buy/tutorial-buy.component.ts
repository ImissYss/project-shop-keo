import { Component, OnInit } from '@angular/core';
import {NavigatorService} from "../../../services/navigator.service";

@Component({
  selector: 'app-tutorial-buy',
  templateUrl: './tutorial-buy.component.html',
  styleUrls: ['./tutorial-buy.component.scss']
})
export class TutorialBuyComponent implements OnInit {

  constructor(private navigator: NavigatorService) { }

  ngOnInit(): void {
  }
  backToPreviousPage(){
    this.navigator.back();
  }
  visibleSidebarBottom = false;
  showBar(){
    this.visibleSidebarBottom = true;
  }

}
