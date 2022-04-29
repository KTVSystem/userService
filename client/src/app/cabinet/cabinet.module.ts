import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { HeaderComponent } from './template/header/header.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationService } from '../services/cabinet/shared/pagination/pagination.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionDetailComponent } from './permissions/permission-detail/permission-detail.component';
import { PermissionCreateComponent } from './permissions/permission-create/permission-create.component';
import { PermissionEditComponent } from './permissions/permission-edit/permission-edit.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningConfirmationComponent } from './shared/warning-confirmation/warning-confirmation.component';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    HomeComponent,
    CabinetComponent,
    UsersComponent,
    UserDetailComponent,
    UserCreateComponent,
    UserEditComponent,
    UserChangePasswordComponent,
    PermissionsComponent,
    PermissionDetailComponent,
    PermissionCreateComponent,
    PermissionEditComponent,
    RolesComponent,
    RoleDetailComponent,
    RoleCreateComponent,
    RoleEditComponent,
    WarningConfirmationComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'ua'
    }),
  ],
  exports: [CabinetComponent],
  providers: [
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class CabinetModule { }
