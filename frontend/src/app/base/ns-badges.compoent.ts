import {Component, Input} from "@angular/core";

@Component({
  selector: 'ns-badges',
  template: `
    <div class="badge">
      <i [class]="icons" style="font-size: 1.3rem; color: rgba(0,0,0,0.58)"></i>
      <span class="num">{{count}}</span>
    </div>
  `,
  styles: [`
    .badge{
      position: relative;
      cursor: pointer;
    }
    .num{
      position: absolute;
      top: -7px;
      right: -5px;
      font-size: 15px;
      color: #FFC107;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #2e2e2e;
    }
  `]
})
export class NsBadgesCompoent{
  @Input() icons: string;
  @Input() count: string;

}
