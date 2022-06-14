import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Validation from "../../utils/validation";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {

  }
  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
  }

  formValid: boolean = false;
  errMessage = '';
  noSubmit: boolean = false;
  onSubmit(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }else{

      this.authService.forgotPassword(this.form.value).subscribe(
        (data) => {
          this.formValid = true;
          this.form.reset();
          this.noSubmit = true;
          this.submitted = false;
        },
        (err) => {
          this.errMessage = "Gmail này không tồn tại trên hệ thống";
          this.form.reset();
        }
      );
      console.log(this.form.value);
    }
  }

}
