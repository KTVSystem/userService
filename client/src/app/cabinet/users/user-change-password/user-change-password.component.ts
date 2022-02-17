import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserChangePasswordDto } from '../../../models/cabinet/users/dtos/user/user-change-password-dto';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RedirectService } from '../../../services/cabinet/shared/redirect/redirect.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit {

  public changePasswordUserForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required], [this.comparePassword()]),
  });
  public id: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private redirectService: RedirectService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  public onSubmit(): void {
    const password: UserChangePasswordDto = {
      password: this.changePasswordUserForm.value.password
    }
    this.userService.changePasswordUser(this.id, password).subscribe((response) => {
      this.handleMessage(response);
    });
  }

  private comparePassword(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      if (control.value !== this.changePasswordUserForm.value.password) {
        return of({notSame: true});
      }
      return of(null);
    };
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
