import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import Validation from "../../utils/validation";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStatus} from "../register/token.component";
import {AuthService} from "../../services/auth.service";
import {FormResetPass} from "../../models/dto/formResetPass";

@Component({
  selector: 'app-reset-password',
  templateUrl: './token-reset-password.component.html',
  styleUrls: ['./token-reset-password.component.scss']
})
export class TokenResetPasswordComponent implements OnInit{
  form: FormGroup;
  submitted: boolean= false;
  pss: string = 'password';
  hidden: boolean = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      password: ['', [Validators.required,
                      Validators.minLength(6),
                      Validators.maxLength(40)]],
      matchingPassword: ['', [
        Validators.required,

      ]]
    },
      {
        validators: [Validation.match('password', 'matchingPassword')]
      })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  showPass(){
    this.pss = 'text';
    this.hidden = false;
  }
  hiddenPass(){
    this.pss = 'password';
    this.hidden = true;
  }

  ngOnInit(): void {
  }

  token = '';
  formResetPassword: FormResetPass;
  onSubmit(){
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    this.token = this.route.snapshot.queryParamMap.get("token")!;
    this.formResetPassword = new FormResetPass(this.token, this.form.value['password']);
    if (this.token){
      this.authService.verifyTokenResetPassword(this.formResetPassword).subscribe(
        data => {
          // this.status = TokenStatus[data.message as keyof typeof TokenStatus];
          console.log(data);
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
