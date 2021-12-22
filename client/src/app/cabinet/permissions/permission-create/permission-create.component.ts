import { Component, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { MessageTypeEnum } from '../../../models/common/message/enums/message-type-enum';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';


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
  responseMessage: string;
  responseMessageType: string;

  constructor(private permissionService: PermissionService) { }

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
      this.responseMessage = response.error;
      this.responseMessageType = MessageTypeEnum.DANGER;
    } else {
      this.responseMessage = response.message;
      this.responseMessageType = MessageTypeEnum.SUCCESS;
    }
  }

}
