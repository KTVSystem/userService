import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../models/cabinet/users/role';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  public role: Role;
  private message: string  = 'Are you sure you want to delete this role?';
  public unsubscribe$ = new Subject();

  constructor(
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.rolesService.getRoleById(id).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
      this.role = response.role;
    });
  }

  public removeRole(id: number): void {
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '200px',
      data: { message: this.message }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((dialogResult) => {
      if (dialogResult) {
        this.rolesService.removeRole(id).pipe(takeUntil(this.unsubscribe$)).subscribe((response) => {
          this.translateService.get('close').pipe(takeUntil(this.unsubscribe$)).subscribe((closeText) => {
            this.snackbar.open(response.message, closeText, {
              duration: 2000,
              verticalPosition: 'top'
            });
            this.redirectService.redirect('/cabinet/roles', 2000);
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
