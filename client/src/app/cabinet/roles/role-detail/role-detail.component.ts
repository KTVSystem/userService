import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../models/cabinet/users/role';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectRoleItem } from '../../../store/roles';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { removeRole } from '../../../store/roles';
import { RoleDetailDto } from '../../../models/cabinet/users/dtos/role/role-detail-dto';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  public role: RoleDetailDto | undefined;
  private message: string;
  public unsubscribe$ = new Subject();

  constructor(
    private rolesService: RolesService,
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
    this.translateService.get('confirmRemoveRole').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.message = text;
    });
    this.store.select(selectRoleItem({id: id})).pipe(takeUntil(this.unsubscribe$)).subscribe((response: Role | undefined) => {
      this.role = response as RoleDetailDto;
    });
  }

  public removeRole(id: string): void {
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '200px',
      data: { message: this.message }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((dialogResult) => {
      if (dialogResult) {
        this.translateService.get('removedRoleSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
          this.store.dispatch(removeRole({ roleId: id, apiMessage: text }));
        });
        this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
          if (this.notificationService.isInitialized(action.apiMessage)) {
            this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/roles');
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
