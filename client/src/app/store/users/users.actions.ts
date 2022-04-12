import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../models/cabinet/users/user';

export enum UsersActionTypes {
  GET_USERS = '[User] Get Users',
  GET_USERS_SUCCESS = '[User] Get Users Success',
  GET_USERS_FAILURE = '[User] Get Users Failure'
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.GET_USERS;
}

export const getUsers = createAction(
  UsersActionTypes.GET_USERS,
);

export const getUsersSuccess = createAction(
  UsersActionTypes.GET_USERS_SUCCESS,
  props<{ users: User[] }>()
);

export const getUsersFailed = createAction(
  UsersActionTypes.GET_USERS_FAILURE,
  props<{ error: any }>()
);
