import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavigatorService} from "../../services/navigator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {AppConstants} from "../../common/app.constants";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  pss: string = 'password';
  hidden = true;


  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private navigator: NavigatorService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    const token: string | null = this.route.snapshot.queryParamMap.get('token');
    const error: string | null = this.route.snapshot.queryParamMap.get('error');

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
    else if (token){
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
    else if (error){
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
      },
      err => {
        this.errorMessage = 'Tài khoản hoặc mật khẩu không đúng?';
        this.isLoginFailed = true;
      }
    );
  }

  showPass(){
    this.pss = 'text';
    this.hidden = false;
  }
  hiddenPass(){
    this.pss = 'password';
    this.hidden = true;
  }
  login(user): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    if (user.roles.indexOf("ROLE_ADMIN") !== -1){
      this.router.navigate(['/admin/dashboard'])
      this.userService.setRoles('admin');
    }else{
      this.navigator.back();
    }
  }
  returnViewPrev(){
    this.navigator.back();
  }

  forgotPassword(){

  }

}
