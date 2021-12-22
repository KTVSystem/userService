import { Component, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { MessageTypeEnum } from '../../../models/common/message/enums/message-type-enum';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';


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
  responseMessage: string;
  responseMessageType: string;
  public permissions: Array<Permission> = [];

  constructor(private rolesService: RolesService, private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.permissionService.getPermissionsAll().subscribe((response) => {
      this.permissions = response.permissions;
      console.log(this.permissions);
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
      this.responseMessage = response.error;
      this.responseMessageType = MessageTypeEnum.DANGER;
    } else {
      this.responseMessage = response.message;
      this.responseMessageType = MessageTypeEnum.SUCCESS;
    }
  }

}
