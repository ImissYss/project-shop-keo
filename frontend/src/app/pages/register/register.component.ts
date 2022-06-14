import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NavigatorService} from "../../services/navigator.service";
import Validation from "../../utils/validation";
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  hidden = true;
  pss: string = 'password';
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  isUsing2FA = false;
  errorMessage = '';
  qrCodeImage = '';

  constructor(private authService: AuthService,
              private formBuilder : FormBuilder,
              private route: Router,
              private navigator: NavigatorService,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    this.form = this.formBuilder.group(
      {
        displayName: ['',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]],
        matchingPassword: ['', [
          Validators.required,

        ]]
      },
      {
        validators: [Validation.match('password', 'matchingPassword')]
      }
    )
  }
  showPass(){
    this.pss = 'text';
    this.hidden = false;
  }
  hiddenPass(){
    this.pss = 'password';
    this.hidden = true;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    // this.route.navigate(['/verifyEmail']);
    this.authService.register(this.form.value).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.route.navigate(['/verifyEmail']);
      },
      err => {
        this.errorMessage = "Email đã tồn tại!";
        this.isSignUpFailed = true;
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  returnViewPrev(){
    this.navigator.back();
  }

}
