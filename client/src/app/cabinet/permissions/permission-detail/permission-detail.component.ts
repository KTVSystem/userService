import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningConfirmationComponent } from '../../shared/warning-confirmation/warning-confirmation.component';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit {
  public permission: Permission;
  private message: string  = 'Are you sure you want to delete this permission?';

  constructor(
    private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.permissionService.getPermissionById(id).subscribe((response) => {
      this.permission = response.permission;
    });
  }

  public removePermission(id: number): void {
    const dialogRef = this.dialog.open(WarningConfirmationComponent, {
      width: '400px',
      height: '200px',
      data: { message: this.message }
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.permissionService.removePermission(id).subscribe(() => {
          this.translateService.get('close').subscribe((closeText) => {
            this.snackbar.open('Permission was deleted!', closeText, {
              duration: 2000,
              verticalPosition: 'top'
            });
            this.redirectService.redirect('/cabinet/permissions', 2000);
          });
        });
      }
    });
  }

}
