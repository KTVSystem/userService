import { Action, createAction, props } from '@ngrx/store';
import { RoleCreateDto } from '../../models/cabinet/users/dtos/role/role-create-dto';
import { Role } from '../../models/cabinet/users/role';

export enum RoleActionTypes {
  GET_ROLES = '[Role] Get Roles',
  GET_ROLES_SUCCESS = '[Role] Get Roles Success',
  GET_ROLES_FAILURE = '[Role] Get Roles Failure',
  CREATE_ROLES = '[Role] Create Role',
  CREATE_ROLES_SUCCESS = '[Role] Create Role Success',
  CREATE_ROLES_FAILURE = '[Role] Create Role Failure',
  EDIT_ROLES = '[Role] Edit Role',
  EDIT_ROLES_SUCCESS = '[Role] Edit Role Success',
  EDIT_ROLES_FAILURE = '[Role] Edit Role Failure',
  REMOVE_ROLES = '[Role] Remove Role',
  REMOVE_ROLES_SUCCESS = '[Role] Remove Role Success',
  REMOVE_ROLES_FAILURE = '[Role] Remove Role Failure',
}

// GET
export class LoadRoles implements Action {
  readonly type = RoleActionTypes.GET_ROLES;
}

export const getRoles = createAction(
  RoleActionTypes.GET_ROLES,
);

export const getRolesSuccess = createAction(
  RoleActionTypes.GET_ROLES_SUCCESS,
  props<{ roles: Role[] }>()
);

export const getRolesFailed = createAction(
  RoleActionTypes.GET_ROLES_FAILURE,
  props<{ error: string }>()
);

// CREATE
export const createRole = createAction(
  RoleActionTypes.CREATE_ROLES,
  props<{ role: RoleCreateDto, apiMessage: string }>()
);

export const createRoleSuccess = createAction(
  RoleActionTypes.CREATE_ROLES_SUCCESS,
  props<{ role: RoleCreateDto, apiMessage: string, typeMessage: string }>()
);

export const createRoleFailed = createAction(
  RoleActionTypes.CREATE_ROLES_FAILURE,
  props<{ apiMessage: string, typeMessage: string }>()
);

// EDIT
export const editRole = createAction(
  RoleActionTypes.EDIT_ROLES,
  props<{ roleId: string, role: RoleCreateDto, apiMessage: string }>()
);

export const editRoleSuccess = createAction(
  RoleActionTypes.EDIT_ROLES_SUCCESS,
  props<{ roleId: string, role: RoleCreateDto, apiMessage: string, typeMessage: string }>()
);

export const editRoleFailed = createAction(
  RoleActionTypes.EDIT_ROLES_FAILURE,
  props<{ apiMessage: string, typeMessage: string }>()
);

// REMOVE
export const removeRole = createAction(
  RoleActionTypes.REMOVE_ROLES,
  props<{ roleId: string, apiMessage: string }>()
);

export const removeRoleSuccess = createAction(
  RoleActionTypes.REMOVE_ROLES_SUCCESS,
  props<{ roleId: string, apiMessage: string, typeMessage: string }>()
);

export const removeRoleFailed = createAction(
  RoleActionTypes.REMOVE_ROLES_FAILURE,
  props<{ error: any }>()
);
