import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../models/cabinet/users/user';
import { UserCreateDto } from '../../models/cabinet/users/dtos/user/user-create-dto';
import { UserEditDto } from '../../models/cabinet/users/dtos/user/user-edit-dto';
import { UserChangePasswordDto } from '../../models/cabinet/users/dtos/user/user-change-password-dto';

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
  EDIT_USER = '[User] Edit User',
  EDIT_USER_SUCCESS = '[User] Edit User Success',
  EDIT_USER_FAILURE = '[User] Edit User Failure',
  CHANGE_PASSWORD_USER = '[User] Change User',
  CHANGE_PASSWORD_USER_SUCCESS = '[User] Change User Success',
  CHANGE_PASSWORD_USER_FAILURE = '[User] Change User Failure',
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
  props<{ error: string }>()
);

// Create
export const addUser = createAction(
  UsersActionTypes.ADD_USER,
  props<{ user: UserCreateDto }>()
);

export const addUserSuccess = createAction(
  UsersActionTypes.ADD_USER_SUCCESS,
  props<{ user: UserCreateDto, apiMessage: string, typeMessage: string }>()
);

export const addUserFailed = createAction(
  UsersActionTypes.ADD_USER_FAILURE,
  props<{ apiMessage: string, typeMessage: string }>()
);

// Edit
export const editUser = createAction(
  UsersActionTypes.EDIT_USER,
  props<{ id: string, user: UserEditDto }>()
);

export const editUserSuccess = createAction(
  UsersActionTypes.EDIT_USER_SUCCESS,
  props<{ id: string, user: UserEditDto, apiMessage: string, typeMessage: string }>()
);

export const editUserFailed = createAction(
  UsersActionTypes.EDIT_USER_FAILURE,
  props<{ apiMessage: string, typeMessage: string }>()
);

// Change Password
export const changePasswordUser = createAction(
  UsersActionTypes.CHANGE_PASSWORD_USER,
  props<{ id: string, password: UserChangePasswordDto }>()
);

export const changePasswordUserSuccess = createAction(
  UsersActionTypes.CHANGE_PASSWORD_USER_SUCCESS,
  props<{ id: string, user: User, apiMessage: string, typeMessage: string }>()
);

export const changePasswordUserFailed = createAction(
  UsersActionTypes.CHANGE_PASSWORD_USER_FAILURE,
  props<{ apiMessage: string, typeMessage: string }>()
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
