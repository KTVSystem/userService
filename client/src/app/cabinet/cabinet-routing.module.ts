import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CabinetGuard } from './cabinet.guard';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionDetailComponent } from './permissions/permission-detail/permission-detail.component';
import { PermissionCreateComponent } from './permissions/permission-create/permission-create.component';
import { PermissionEditComponent } from './permissions/permission-edit/permission-edit.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';

const routes: Routes = [
  {
    path: 'cabinet', component: CabinetComponent, canActivate: [CabinetGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          breadcrumb: {
            label: 'Home'
          }
        }
      },

      //Users
      {
        path: 'users',
        component: UsersComponent,
        data: {
          breadcrumb: {
            label: 'Users'
          }
        }
      },
      {
        path: 'users/create',
        component: UserCreateComponent,
        data: {
          breadcrumb: {
            label: 'Create user',
            parent: [
              {
                label: 'Users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
        data: {
          breadcrumb: {
            label: 'User detail',
            parent: [
              {
                label: 'Users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      {
        path: 'users/edit/:id',
        component: UserEditComponent,
        data: {
          breadcrumb: {
            label: 'Edit user',
            parent: [
              {
                label: 'Users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      {
        path: 'users/change-password/:id',
        component: UserChangePasswordComponent,
        data: {
          breadcrumb: {
            label: 'Change user password',
            parent: [
              {
                label: 'Users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      //Users

      //Permissions
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          breadcrumb: {
            label: 'Permissions'
          }
        }
      },
      {
        path: 'permissions/create',
        component: PermissionCreateComponent,
        data: {
          breadcrumb: {
            label: 'Create permissionp',
            parent: [
              {
                label: 'Permissions',
                link: '/cabinet/permissions'
              }
            ]
          }
        }
      },
      {
        path: 'permissions/:id',
        component: PermissionDetailComponent,
        data: {
          breadcrumb: {
            label: 'Permission detail',
            parent: [
              {
                label: 'Permissions',
                link: '/cabinet/permissions'
              }
            ]
          }
        }
      },
      {
        path: 'permissions/edit/:id',
        component: PermissionEditComponent,
        data: {
          breadcrumb: {
            label: 'Edit permission',
            parent: [
              {
                label: 'Permissions',
                link: '/cabinet/permissions'
              }
            ]
          }
        }
      },
      //Permissions

      //Roles
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          breadcrumb: {
            label: 'Roles'
          }
        }
      },
      {
        path: 'roles/create',
        component: RoleCreateComponent,
        data: {
          breadcrumb: {
            label: 'Create role',
            parent: [
              {
                label: 'Roles',
                link: '/cabinet/roles'
              }
            ]
          }
        }
      },
      {
        path: 'roles/:id',
        component: RoleDetailComponent,
        data: {
          breadcrumb: {
            label: 'Roles detail',
            parent: [
              {
                label: 'Roles',
                link: '/cabinet/roles'
              }
            ]
          }
        }
      },
      {
        path: 'roles/edit/:id',
        component: RoleEditComponent,
        data: {
          breadcrumb: {
            label: 'Edit role',
            parent: [
              {
                label: 'Roles',
                link: '/cabinet/roles'
              }
            ]
          }
        }
      },
      //Roles
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
