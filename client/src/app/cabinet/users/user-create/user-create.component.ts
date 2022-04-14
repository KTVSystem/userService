import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { UserCreateDto } from '../../../models/cabinet/users/dtos/user/user-create-dto';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { RolesListDto } from '../../../models/cabinet/users/dtos/roles-list-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import {addUser, deleteUser, selectApiMessageItem} from '../../../store/users';
import * as fromUser from '../../../store/users/users.actions';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  public createUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('0'),
    status: new FormControl('0'),
  });
  public roles: Array<RolesListDto>;
  public statuses: Array<Status>;
  public unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.rolesService.getActiveRoles().pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      this.roles = response;
    });
    this.statuses = statuses;
  }

  public onSubmit(): void {
    const user: UserCreateDto = {
      email: this.createUserForm.value.email,
      password: this.createUserForm.value.password,
      role: (this.createUserForm.value.role === '0') ? this.roles[0].id : this.createUserForm.value.role,
      status: (this.createUserForm.value.status === '0') ? this.statuses[0].key : this.createUserForm.value.status
    };
    this.store.dispatch(addUser({ user: user }));
    //this.store.dispatch(new fromUser.LoadUsers());
    this.store.select(selectApiMessageItem).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      if (response) {
        this.handleMessage(response);
      }
    });
  }

  private handleMessage(response: any): void {
    this.translateService.get('close').pipe(takeUntil(this.unsubscribe$)).subscribe((closeText) => {
      if (response.error) {
        this.snackbar.open(response.error, closeText, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'snack-danger'
        });
      } else {
        this.snackbar.open(response.message, closeText, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'snack-success'
        });
        this.redirectService.redirect('/cabinet/users', 2000);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
