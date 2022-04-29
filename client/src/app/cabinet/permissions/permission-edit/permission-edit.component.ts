import { Component, OnDestroy, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { ActivatedRoute } from '@angular/router';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { Actions } from '@ngrx/effects';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { selectPermissionItem } from '../../../store/permissions';
import { Permission } from '../../../models/cabinet/users/permission';
import { editPermission } from '../../../store/permissions/';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit, OnDestroy {
  public editPermissionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
  });
  public statuses: Array<Status>;
  public permission: PermissionCreateDto;
  public id: string;
  public unsubscribe$ = new Subject();

  constructor(
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.store.select(selectPermissionItem({id: this.id})).pipe(takeUntil(this.unsubscribe$)).subscribe((response: Permission | undefined) => {
      if (response) {
        this.permission = response as PermissionCreateDto;
        this.fillEditPermissionForm(this.permission);
      }
    });
  }

  public onSubmit(): void {
    const permission: PermissionCreateDto = {
      name: this.editPermissionForm.value.name,
      status: (this.editPermissionForm.value.status === '0') ? this.statuses[0].key : this.editPermissionForm.value.status
    };
    this.translateService.get('editedPermissionSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.store.dispatch(editPermission({ permissionId: this.id, permission: permission, apiMessage: text }));
    });
    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/permissions');
      }
    });
  }

  private fillEditPermissionForm(permission: PermissionCreateDto): void {
    this.editPermissionForm.patchValue({name: permission.name, status: permission.status});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
