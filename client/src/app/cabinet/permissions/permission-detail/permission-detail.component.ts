import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { deletePermission, selectPermissionItem, selectApiMessageItem } from '../../../store/permissions';
import { PermissionDetailDto } from '../../../models/cabinet/users/dtos/permission/permission-detail-dto';

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit, OnDestroy {
  public permission: PermissionDetailDto;
  private message: string  = 'Are you sure you want to delete this permission?';
  public unsubscribe$ = new Subject();

  constructor(
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
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
        this.store.dispatch(deletePermission({ permissionId: id }));
        this.store.select(selectApiMessageItem).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
          this.translateService.get('close').pipe(takeUntil(this.unsubscribe$)).subscribe((closeText) => {
            this.snackbar.open(response.apiMessage, closeText, {
              duration: 2000,
              verticalPosition: 'top'
            });
            this.redirectService.redirect('/cabinet/permissions', 2000);
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
