import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login/login';
import { LoginService } from '../services/login/login.service';
import { TokenService } from '../services/token/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { SocialUser } from '../models/login/social-user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [Validators.required]),
  });
  public isBlock: boolean;
  public unsubscribe$ = new Subject();

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.isAuth) {
      this.router.navigate(['/cabinet']).then();
    }
    this.isBlock = this.loginService.isBlockUser();
    if (!this.isBlock) {
      this.loginService.clearBlockData();
    }
  }

  public onSubmit(): void {
    const login: Login = {email: this.loginForm.value.email, password: this.loginForm.value.password};
    this.loginService.signIn(login).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      if (response) {
        this.handleResponse(response);
      }
    });
  }

  public loginFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((socialUser: SocialUser) => {
      this.loginService.signInSocial(socialUser).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
        if (response) {
          this.handleResponse(response);
        }
      });
    });
  }

  public loginGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((socialUser: SocialUser) => {
      this.loginService.signInSocial(socialUser).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
        if (response) {
          this.handleResponse(response);
        }
      });
    });
  }

  private handleResponse(response: any): void {
    if (response.error) {
      const wrong = Number(this.loginService.storeWrongAttemp());
      if (wrong === 5) {
        this.loginService.blockUser()
        this.isBlock = true;
      }
      this.snackbar.open(response.error, 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
    } else {
      this.tokenService.writeToken(response.token);
      this.router.navigate(['/cabinet']).then();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
