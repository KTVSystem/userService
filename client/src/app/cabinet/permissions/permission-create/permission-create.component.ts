import { Component, OnDestroy, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createPermission } from '../../../store/permissions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { Actions } from '@ngrx/effects';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.scss']
})
export class PermissionCreateComponent implements OnInit, OnDestroy {
  public createPermissionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
  });
  public statuses: Array<Status>;
  public unsubscribe$ = new Subject();

  constructor(
    private permissionService: PermissionService,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
  }

  public onSubmit(): void {
    const permission: PermissionCreateDto = {
      name: this.createPermissionForm.value.name,
      status: (this.createPermissionForm.value.status === '0') ? this.statuses[0].key : this.createPermissionForm.value.status
    };
    this.translateService.get('createdPermissionSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.store.dispatch(createPermission({ permission: permission, apiMessage: text }));
    });
    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/permissions');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
