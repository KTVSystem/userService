import { Component, OnDestroy, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { Actions } from '@ngrx/effects';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { editRole } from '../../../store/roles';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {
  public editRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
    permissions: new FormControl([]),
  });
  public statuses: Array<Status>;
  public role: RoleCreateDto;
  public id: string;
  public permissions: Array<Permission> = [];
  public unsubscribe$ = new Subject();

  constructor(
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.rolesService.getRoleById(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      if (response) {
        this.role = response.role;
        this.fillEditPermissionForm(response.role);
      }
    });
    this.permissionService.getActivePermissions().pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      this.permissions = response;
    });
  }

  public onSubmit(): void {
    const role: RoleCreateDto = {
      name: this.editRoleForm.value.name,
      status: (this.editRoleForm.value.status === '0') ? this.statuses[0].key : this.editRoleForm.value.status,
      permissions: this.editRoleForm.value.permissions,
    };
    this.store.dispatch(editRole({ roleId: this.id, role: role }));
    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/roles');
      }
    });
  }

  private fillEditPermissionForm(role: RoleCreateDto): void {
    const permissionIds = role.permissions?.map((item: any) => item._id);
    this.editRoleForm.patchValue({name: role.name, status: role.status, permissions: permissionIds});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
