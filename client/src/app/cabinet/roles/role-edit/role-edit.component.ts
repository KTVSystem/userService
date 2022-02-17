import { Component, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {
  public editRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
    permissions: new FormControl([]),
  });
  public statuses: Array<Status>;
  public role: RoleCreateDto;
  public id: number;
  public permissions: Array<Permission> = [];

  constructor(
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.rolesService.getRoleById(this.id).subscribe((response) => {
      if (response) {
        this.role = response.role;
        this.fillEditPermissionForm(response.role);
      }
    });
    this.permissionService.getPermissionsAll().subscribe((response) => {
      this.permissions = response.permissions;
    });
  }

  public onSubmit(): void {
    const role: RoleCreateDto = {
      name: this.editRoleForm.value.name,
      status: (this.editRoleForm.value.status === '0') ? this.statuses[0].key : this.editRoleForm.value.status,
      permissions: this.editRoleForm.value.permissions,
    };
    this.rolesService.editRole(this.id, role).subscribe((response) => {
      this.handleMessage(response);
    });
  }

  private fillEditPermissionForm(role: RoleCreateDto): void {
    const permissionIds = role.permissions?.map((item: any) => item._id);
    this.editRoleForm.patchValue({name: role.name, status: role.status, permissions: permissionIds});
  }

  private handleMessage(response: any): void {
    this.translateService.get('close').subscribe((closeText) => {
      if (response.error) {
        this.snackbar.open(response.error, closeText, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'snack-danger'
        });
      } else {
        this.snackbar.open(response.message, closeText, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'snack-success'
        });
        this.redirectService.redirect('/cabinet/roles', 2000);
      }
    });
  }

}
