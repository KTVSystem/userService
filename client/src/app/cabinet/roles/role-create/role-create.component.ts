import { Component, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { MessageTypeEnum } from '../../../models/common/message/enums/message-type-enum';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {
  public createRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
  });
  public statuses: Array<Status>;
  responseMessage: string;
  responseMessageType: string;

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    this.statuses = statuses;
  }

  public onSubmit(): void {
    const role: RoleCreateDto = {
      name: this.createRoleForm.value.name,
      status: (this.createRoleForm.value.status === '0') ? this.statuses[0].key : this.createRoleForm.value.status
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
