import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OptionPolicy} from "../../enums/OptionPolicy";
import {ProductService} from "../../services/product.service";
import {Policy} from "../../models/policy";
import {MessageService} from "primeng/api";

// import Quill from 'quill'
// import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';

// Quill.register('modules/blotFormatter', BlotFormatter);


@Component({
  selector: 'app-policy-admin',
  templateUrl: './policy-admin.component.html',
  styleUrls: ['./policy-admin.component.scss']
})
export class PolicyAdminComponent implements OnInit {

  modules = {}
  form: FormGroup;
  policy: Policy;
  isCreate: boolean;
  visiblePolicy: boolean = false;
  header: string;
  submitted: boolean = false;
  constructor(private fb: FormBuilder,
              private policyService: ProductService,
              private messageService: MessageService) {
    // this.modules = {
    //   'emoji-shortname': true,
    //   'emoji-textarea': false,
    //   'emoji-toolbar': true,
    //   blotFormatter: {
    //     // empty object for default behaviour.
    //   },
    //   'toolbar': {
    //     container: [
    //       ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //       ['blockquote', 'code-block'],
    //
    //       [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    //       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //       [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    //       [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    //       [{ 'direction': 'rtl' }],                         // text direction
    //
    //       [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    //
    //       [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //       [{ 'font': [] }],
    //       [{ 'align': [] }],
    //
    //       ['clean'],                                         // remove formatting button
    //
    //       ['link', 'image', 'video'],                         // link and image, video
    //       ['emoji'],
    //     ],
    //     handlers: { 'emoji': function () { } },
    //
    //   }
    // }

  }

  // addBindingCreated(quill) {
  //   quill.keyboard.addBinding({
  //     key: 'b'
  //   }, (range, context) => {
  //     // tslint:disable-next-line:no-console
  //     console.log('KEYBINDING B', range, context)
  //   })
  //
  //   quill.keyboard.addBinding({
  //     key: 'B',
  //     shiftKey: true
  //   }, (range, context) => {
  //     // tslint:disable-next-line:no-console
  //     console.log('KEYBINDING SHIFT + B', range, context)
  //   })
  // }

  ngOnInit(): void {
    this.policyService.getPolicy(OptionPolicy.POLICY).subscribe(
      (data) => {
        this.policy = data;
        console.log("--policy----");
        console.log(data);
        if (this.policy != null){
          this.isCreate = false;
        }else{
          this.isCreate = true;
        }
      }
    )
    this.form = this.fb.group({
      id: [''],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: [OptionPolicy.POLICY]
      }
    )
  }

  get f(): {[key: string]: AbstractControl}{
    return this.form.controls;
  }

  onSubmit(){
    console.log(this.form.value);
    this.policyService.createPolicy(this.form.value).subscribe(
      (data) => {
        this.policy = data;
        this.isCreate = false;
        this.form.reset();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'update sản phẩm thành công'});
      }
    )
  }

  openCreate(){
    this.visiblePolicy = true;
    this.header = "Tạo thông tin về chính sách bảo hành, đổi trả"
  }

  openEdit(){
    this.form.patchValue(this.policy);
    this.visiblePolicy = true;
    this.header = "Chỉnh sửa thông tin về chính sách bảo hành đổi trả";
    console.log(this.form.value);
  }
  onReset(){
    this.form.reset();
  }

  cancel(){
    this.visiblePolicy = false;
  }

}
