import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserChangePasswordDto } from '../../../models/cabinet/users/dtos/user/user-change-password-dto';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { Actions } from '@ngrx/effects';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { changePasswordUser } from '../../../store/users';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent implements OnInit, OnDestroy {

  public changePasswordUserForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required], [this.comparePassword()]),
  });
  public id: string;
  public unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  public onSubmit(): void {
    const password: UserChangePasswordDto = {
      password: this.changePasswordUserForm.value.password
    }
    this.translateService.get('changedUserPasswordSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.store.dispatch(changePasswordUser({ id: this.id, password: password, apiMessage:  text }));
    });
    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/users');
      }
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
