
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  ViewEncapsulation
} from "@angular/core";
import {AbstractControl, ControlValueAccessor, NgControl} from "@angular/forms";
import {QuillEditorComponent, QuillModules} from "ngx-quill";
import {CommonUtils} from "../common/common.utils";

@Component({
  selector: 'ns-quill-editor',
  template: `
    <div class="ns-quill-editor"
         [ngClass]="{'labelOutside': !!isLabelOutside,
            'float_label': !!isFloatLabel && !isLabelOutside,
            'text_area': !!this.multiline}"
         fxLayout="row" fxLayout.lt-sm="row wrap">
      <label *ngIf="isLabelOutside" class="label_width"
                 fxLayout="column" fxFlex="auto" fxFlex.lt-md="100%">
        <div class="label">
          <div>
            {{(label ? label : '')}}<span
            class="required-label-outside">{{!!required ? '*' : ''}}</span>
          </div>
        </div>
      </label>
      <div class="editor" fxLayout="column" fxFlex="100%">
        <quill-editor [(ngModel)]="textValue"
                      [modules]="quillModule"
                      [disabled]="disabled"
                      [readOnly]="readonly"
                      [maxLength]="maxLength"
                      [minLength]="minLength"
                      [placeholder]="placeholder"
                      [format]="format"
                      (onFocus)="onFocus($event)"
                      (onBlur)="onBlur($event)"
                      #quill
                      (onContentChanged)="onChangeContent(quill, $event)"
                      fxFlex="100%" fxFlex.lt-md="100%"
        ></quill-editor>
        <div id="counter"
             *ngIf="!(disabled || readonly) && onFocusStatus && !!maxLength">{{textCounter + '/' + maxLength}}</div>

      </div>
    </div>
  `,
  styles: [
    `
      .ns-quill-editor {
        margin-bottom: 1rem;
      }

      .ns-quill-editor .required-label-outside {
        color: red;
      }

      .ns-quill-editor .ql-container.ql-snow {
        height: 100px;
        overflow-y: auto;
      }

      .ns-quill-editor #counter {
        border: 1px solid #ccc;
        border-width: 0px 1px 1px 1px;
        color: #aaa;
        padding: 5px 15px;
        text-align: right;
      }

      .ns-quill-editor quill-editor {
        margin-bottom: 0 !important;
        word-break: break-word;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,

})
export class NsQuillEditorComponent implements ControlValueAccessor, OnInit{

  @Input() label = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() text = '';
  textCounter = 0;
  // nếu cho vào base thì define rõ ràng, default check valid only text
  @Input() quillModule: QuillModules = CommonUtils.createQuillModuleWithImage();
  @Input() onlyCheckTextValidation = true;

  @Input() format?: 'object' | 'html' | 'text' | 'json' = 'html';
  @Input() pattern: any = null;
  @Input() readonly = false;
  @Input() errorMessages = new Map<string, (e?: any) => string>();
  @Output() onChange = new EventEmitter<string>();
  @Input() multiline = false;
  @Input() isLabelOutside = false;
  @Input() isFloatLabel = true;
  @Input() minLength: number | undefined;
  @Input() maxLength: number | undefined;
  @Input() maxSize: number | undefined; // don vi byte
  @Input() minSize: number | undefined; // don vi byte
  onFocusStatus = false;
  /* hiển thị suffix thay maxlength */
  @Input() maxLengthDisplay: number | undefined;

  // Chỉ bằng false khi trong NsSmartTable thôi nhé @@
  @Input() isFormControl = true;
  @Input() formatFunc: any;
  control: AbstractControl | undefined = undefined;

  constructor(private injector: Injector,
              @Self() @Optional() ngControl: NgControl) {
    if (ngControl) {
      // Hành động này thay cho provide: NG_VALUE_ACCESSOR và gắn ControlValueAccessor này vào parent FormControl
      ngControl.valueAccessor = this;
    }
  }

  onChangeContent(quill: QuillEditorComponent | any, text: any) {
    if (!text.html) {
      this.textCounter = 0;
    } else {
      this.textCounter = quill.editorElem.innerText.length;
    }
    this.writeValue(this.text);
  }

  propagateChange = (_: any) => {
    /*NON-EMPTY FOR COMPILE*/
  };

  onFocus(event: any) {
    this.onFocusStatus = true;
  }

  onBlur(event: any) {
    if (this.onFocusStatus) {
      this.onFocusStatus = false;
    }
  }

  ngOnInit(): void {
  }

  get textValue() {
    return this.text;
  }

  set textValue(val) {
    this.writeValue(val);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.text = obj;
    this.propagateChange(this.text);
    this.onChange.emit(this.text);
  }
}
