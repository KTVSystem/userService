import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';
import { MatDialog } from '@angular/material/dialog';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { deletePermission, selectPermissionItem } from '../../../store/permissions';
import { PermissionDetailDto } from '../../../models/cabinet/users/dtos/permission/permission-detail-dto';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit, OnDestroy {
  public permission: PermissionDetailDto;
  private message: string;
  public unsubscribe$ = new Subject();

  constructor(
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private store: Store<fromRoot.State>,
    private notificationService: NotificationService,
    private actions$: Actions<any>,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.translateService.get('confirmRemovePermission').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.message = text;
    });
    this.store.select(selectPermissionItem({id: id})).pipe(takeUntil(this.unsubscribe$)).subscribe((response: Permission | undefined) => {
      this.permission = response as PermissionDetailDto;
    });
  }

  public removePermission(id: string): void {
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '200px',
      data: { message: this.message }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((dialogResult) => {
      if (dialogResult) {
        this.translateService.get('removedPermissionSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
          this.store.dispatch(deletePermission({ permissionId: id, apiMessage: text }));
        });
        this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
          if (this.notificationService.isInitialized(action.apiMessage)) {
            this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/permissions');
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
