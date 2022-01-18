import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { UserCreateDto } from '../../../models/cabinet/users/dtos/user/user-create-dto';
import { roles } from '../../../models/cabinet/users/lists/roles-list';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { RolesListDto } from '../../../models/cabinet/users/dtos/roles-list-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public createUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('0'),
    status: new FormControl('0'),
  });
  public roles: Array<RolesListDto>;
  public statuses: Array<Status>;

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService
  ) { }

  ngOnInit(): void {
    this.roles = roles;
    this.statuses = statuses;
  }

  public onSubmit(): void {
    const user: UserCreateDto = {
      email: this.createUserForm.value.email,
      password: this.createUserForm.value.password,
      role: (this.createUserForm.value.role === '0') ? this.roles[0].key : this.createUserForm.value.role,
      status: (this.createUserForm.value.status === '0') ? this.statuses[0].key : this.createUserForm.value.status
    };
    this.userService.createUser(user).subscribe((response) => {
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
