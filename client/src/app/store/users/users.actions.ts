import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../models/cabinet/users/user';
import {UserCreateDto} from '../../models/cabinet/users/dtos/user/user-create-dto';

export enum UsersActionTypes {
  GET_USERS = '[User] Get Users',
  GET_USERS_SUCCESS = '[User] Get Users Success',
  GET_USERS_FAILURE = '[User] Get Users Failure',
  REMOVE_USER = '[User] Remove User',
  REMOVE_USER_SUCCESS = '[User] Remove User Success',
  REMOVE_USER_FAILURE = '[User] Remove User Failure',
  ADD_USER = '[User] Add User',
  ADD_USER_SUCCESS = '[User] Add User Success',
  ADD_USER_FAILURE = '[User] Add User Failure',
}

// Get
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


// Create
export const addUser = createAction(
  UsersActionTypes.ADD_USER,
  props<{ user: UserCreateDto }>()
);

export const addUserSuccess = createAction(
  UsersActionTypes.ADD_USER_SUCCESS,
  props<{ apiMessage: string }>()
);

export const addUserFailed = createAction(
  UsersActionTypes.ADD_USER_FAILURE,
  props<{ error: any }>()
);


// Delete
export const deleteUser = createAction(
  UsersActionTypes.REMOVE_USER,
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  UsersActionTypes.REMOVE_USER_SUCCESS,
  props<{ userId: string, apiMessage: string }>()
);

export const deleteUserFailed = createAction(
  UsersActionTypes.REMOVE_USER_FAILURE,
  props<{ error: any }>()
);
