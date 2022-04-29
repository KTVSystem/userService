import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { ActivatedRoute } from '@angular/router';
import { UserEditDto } from '../../../models/cabinet/users/dtos/user/user-edit-dto';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { editUser, selectUserItem } from '../../../store/users';
import { User } from '../../../models/cabinet/users/user';
import { Role } from '../../../models/cabinet/users/role';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  public editUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    role: new FormControl('0'),
    status: new FormControl('0'),
  });
  public roles: Array<Role>;
  public statuses: Array<Status>;
  public user: UserEditDto;
  public id: string;
  public unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.rolesService.getActiveRoles().pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      this.roles = response;
    });
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.store.select(selectUserItem({id: this.id})).pipe(takeUntil(this.unsubscribe$)).subscribe((response: User | undefined) => {
      this.user = response as UserEditDto;
      this.fillEditUserForm(this.user);
    });
  }

  private fillEditUserForm(user: UserEditDto): void {
    this.editUserForm.patchValue({email: user.email, role: user.role.name, status: user.status});
  }

  public onSubmit(): void {
    const user: UserEditDto = {
      email: this.editUserForm.value.email,
      role: (this.editUserForm.value.role === '0') ? this.roles[0] : (this.roles.filter(role => role.name === this.editUserForm.value.role)[0]),
      status: (this.editUserForm.value.status === '0') ? this.statuses[0].key : this.editUserForm.value.status
    };

    this.translateService.get('editedUserSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.store.dispatch(editUser({ id: this.id, user: user, apiMessage: text }));
    });
    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/users');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
