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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
