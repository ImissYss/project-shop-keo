import {Component, Input} from "@angular/core";

@Component({
  selector: 'ns-button',
  template: `
    <button aria-label="tpshop-action" [ngStyle]="getStyle()" [type]="cType" class="ns-but">{{label}}</button>
  `,
  styles: [`
    .ns-but{
      border: none;
      margin-left: 5px;
    }
  `]
})
export class NsButtonComponent{
  @Input() label: string;
  @Input() cWidth;
  @Input() cHeight;
  @Input() cBorder;
  @Input() cBackground;
  @Input() lWidth;
  @Input() cType;

  getStyle(){
    const myStyle = {
      'width.px': this.cWidth? this.cWidth : '',
      'height.px':  this.cHeight? this.cHeight: '',
      'border-radius.px': this.cBorder? this.cBorder: '',
      'background-color':this.cBackground? this.cBackground: '',
      'width.%': this.lWidth? this.lWidth: ''
    }
    return myStyle;
  }
}
