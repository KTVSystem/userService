import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { MessageTypeEnum } from "../../../models/common/message/enums/message-type-enum";
import { ActivatedRoute } from '@angular/router';
import { UserEditDto } from '../../../models/cabinet/users/dtos/user/user-edit-dto';
import {PermissionCreateDto} from "../../../models/cabinet/users/dtos/permission/permission-create-dto";
import {PermissionService} from "../../../services/cabinet/permissions/permission.service";


@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss']
})
export class PermissionEditComponent implements OnInit {
  public editPermissionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
  });
  public statuses: Array<Status>;
  responseMessage: string;
  responseMessageType: string;
  public permission: PermissionCreateDto;
  public id: number;

  constructor(private permissionService: PermissionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.permissionService.getPermissionById(this.id).subscribe((response) => {
      if (response) {
        this.permission = response.permission;
        this.fillEditPermissionForm(response.permission);
      }
      console.log(this.permission);
    });
  }

  public onSubmit(): void {
    const permission: PermissionCreateDto = {
      name: this.editPermissionForm.value.name,
      status: (this.editPermissionForm.value.status === '0') ? this.statuses[0].key : this.editPermissionForm.value.status
    };
    this.permissionService.editPermission(this.id, permission).subscribe((response) => {
      this.handleMessage(response);
    });
  }

  private fillEditPermissionForm(permission: PermissionCreateDto): void {
    this.editPermissionForm.patchValue({name: permission.name, status: permission.status});
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
