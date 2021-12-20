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
import { PaginationComponent } from './shared/pagination/pagination.component';
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

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    HomeComponent,
    CabinetComponent,
    UsersComponent,
    PaginationComponent,
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
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [CabinetComponent],
  providers: [
    PaginationService
  ],
  bootstrap: []
})
export class CabinetModule { }
