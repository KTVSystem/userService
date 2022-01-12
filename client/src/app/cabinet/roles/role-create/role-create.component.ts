import { Component, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {
  public createRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
    permissions: new FormControl([]),
  });
  public statuses: Array<Status>;
  public permissions: Array<Permission> = [];

  constructor(
    private rolesService: RolesService,
    private permissionService: PermissionService,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.permissionService.getPermissionsAll().subscribe((response) => {
      this.permissions = response.permissions;
    });
  }

  public onSubmit(): void {
    const role: RoleCreateDto = {
      name: this.createRoleForm.value.name,
      status: (this.createRoleForm.value.status === '0') ? this.statuses[0].key : this.createRoleForm.value.status,
      permissions: this.createRoleForm.value.permissions,
    };

    this.rolesService.createRole(role).subscribe((response) => {
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
      this.redirectService.redirect('/cabinet/roles', 2000);
    }
  }

}
