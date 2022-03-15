import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { ActivatedRoute } from '@angular/router';
import { UserEditDto } from '../../../models/cabinet/users/dtos/user/user-edit-dto';
import { RolesListDto } from '../../../models/cabinet/users/dtos/roles-list-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';
import { RolesService } from '../../../services/cabinet/roles/roles.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public editUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    role: new FormControl('0'),
    status: new FormControl('0'),
  });
  public roles: Array<RolesListDto>;
  public statuses: Array<Status>;
  public user: UserEditDto;
  public id: number;

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.rolesService.getActiveRoles().subscribe((response) => {
      this.roles = response;
    });
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe((response) => {
      if (response) {
        this.user = response.user;
        this.fillEditUserForm(response.user);
      }
      console.log(this.user);
    });
  }

  public onSubmit(): void {
    const user: UserEditDto = {
      email: this.editUserForm.value.email,
      role: (this.editUserForm.value.role === '0') ? this.roles[0].id :
        Array.isArray(this.editUserForm.value.role) ? this.editUserForm.value.role[0] : this.editUserForm.value.role,
      status: (this.editUserForm.value.status === '0') ? this.statuses[0].key : this.editUserForm.value.status
    };
    this.userService.editUser(this.id, user).subscribe((response) => {
      this.handleMessage(response);
    });
  }

  private fillEditUserForm(user: UserEditDto): void {
    this.editUserForm.patchValue({email: user.email, role: user.role.name, status: user.status});
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
        this.redirectService.redirect('/cabinet/users', 2000);
      }
    });
  }

}
