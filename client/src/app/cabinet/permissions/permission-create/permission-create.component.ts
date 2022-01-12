import { Component, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';


@Component({
  selector: 'app-permission-create',
  templateUrl: './permission-create.component.html',
  styleUrls: ['./permission-create.component.scss']
})
export class PermissionCreateComponent implements OnInit {
  public createPermissionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
  });
  public statuses: Array<Status>;

  constructor(
    private permissionService: PermissionService,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
  }

  public onSubmit(): void {
    const permission: PermissionCreateDto = {
      name: this.createPermissionForm.value.name,
      status: (this.createPermissionForm.value.status === '0') ? this.statuses[0].key : this.createPermissionForm.value.status
    };
    this.permissionService.createPermission(permission).subscribe((response) => {
      this.handleMessage(response);
    });
  }

  private handleMessage(response: any): void {
    if (response.error) {
      this.snackbar.open(response.error, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'snack-danger'
      });
    } else {
      this.snackbar.open(response.message, 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'snack-success'
      });
      this.redirectService.redirect('/cabinet/users', 2000);
    }
  }

}
