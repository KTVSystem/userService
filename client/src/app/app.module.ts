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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    LoginService,
    TokenService,
    UserService,
    PermissionService,
    RolesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
