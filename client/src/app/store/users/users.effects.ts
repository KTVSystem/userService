import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { UserService } from '../../services/cabinet/users/user.servise';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions<any>, private userService: UserService) {}

  getUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.UsersActionTypes.GET_USERS),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UsersActions.getUsersSuccess(users)),
          catchError((error) => of(UsersActions.getUsersFailed({ error: error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.UsersActionTypes.ADD_USER),
      switchMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((response) => {
            if (response.error) {
              return UsersActions.addUserFailed({ apiMessage: response.error, typeMessage: 'error' });
            } else {
              return UsersActions.addUserSuccess({user: response.user, apiMessage: response.message, typeMessage: 'success'});
            }
          }),
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.UsersActionTypes.EDIT_USER),
      switchMap((action) =>
        this.userService.editUser(action.id, action.user).pipe(
          map((response) => {
            if (response.error) {
              return UsersActions.editUserFailed({ apiMessage: response.error, typeMessage: 'error' });
            } else {
              return UsersActions.editUserSuccess({id: action.id, user: response.user, apiMessage: response.message, typeMessage: 'success'});
            }
          }),
        )
      )
    )
  );

  changePasswordUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.UsersActionTypes.CHANGE_PASSWORD_USER),
      switchMap((action) =>
        this.userService.changePasswordUser(action.id, action.password).pipe(
          map((response) => {
            if (response.error) {
              return UsersActions.changePasswordUserFailed({ apiMessage: response.error, typeMessage: 'error' });
            } else {
              return UsersActions.changePasswordUserSuccess({id: action.id, user: response.user, apiMessage: response.message, typeMessage: 'success'});
            }
          }),
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.UsersActionTypes.REMOVE_USER),
      switchMap((action) =>
        this.userService.removeUser(action.userId).pipe(
          map((apiMessage) => UsersActions.deleteUserSuccess({ userId: action.userId, apiMessage: apiMessage.message })),
          catchError((error) => of(UsersActions.deleteUserFailed({ error: error })))
        )
      )
    )
  );

}
