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
          map((users) => {
            console.log(users);
            return UsersActions.getUsersSuccess({ users: users })
            }),
          catchError((error) => of(UsersActions.getUsersFailed({ error: error })))
        )
      )
    )
  );

}
