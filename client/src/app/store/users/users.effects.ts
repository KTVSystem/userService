import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {map, switchMap, catchError, tap} from 'rxjs/operators';
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
          map((apiMessage) => UsersActions.addUserSuccess({apiMessage: apiMessage.message})),
          catchError((error) => of(UsersActions.addUserFailed({ error: error })))
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
