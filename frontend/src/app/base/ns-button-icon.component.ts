import {Component, Input} from "@angular/core";

@Component({
  selector: 'ns-button-icon',
  template: `
    <button aria-label="gio-hang" type="button" class="ns-btn-icon" *ngIf="icon === 'cart'"><i class="fas fa-shopping-cart"></i></button>
    <button aria-label="arrow-left" type="button" class="ns-btn-icon" *ngIf="icon === 'return'"><i class="fas fa-arrow-left"></i></button>
    <button aria-label="like-heart" type="button" class="ns-btn-icon" *ngIf="icon === 'heart'"><i class="far fa-heart"></i></button>
    <button aria-label="noti-add" type="button" class="ns-btn-icon" *ngIf="icon === 'ellipsis'"><i class="pi pi-ellipsis-v"></i></button>
  `,
  styles: [`
  .ns-btn-icon{
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: #F1F3F4;
    color: rgba(0,0,0,0.68);
  }
  `]
})
export class NsButtonIconComponent{
  @Input() icon: string;
}
