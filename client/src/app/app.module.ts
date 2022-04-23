import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabinetModule } from './cabinet/cabinet.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenService } from './services/token/token.service';
import { UserService } from './services/cabinet/users/user.servise';
import { PermissionService } from './services/cabinet/permissions/permission.service';
import { RolesService } from './services/cabinet/roles/roles.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RedirectService } from './services/cabinet/shared/redirect/redirect.service';
import { NotificationService } from './services/cabinet/shared/notification/notification.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from 'angularx-social-login';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users/';
import { PermissionsEffects } from './store/permissions';
import { RolesEffects } from './store/roles';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CabinetModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    SocialLoginModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([UsersEffects, PermissionsEffects, RolesEffects]),
  ],
  providers: [
    LoginService,
    TokenService,
    UserService,
    PermissionService,
    RolesService,
    RedirectService,
    NotificationService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('966404853961-bl88ukkan3aim1dr4av6ds876mef8sr1')
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('293796066115382')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
