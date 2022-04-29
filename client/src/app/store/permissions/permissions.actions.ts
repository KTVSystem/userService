import { Action, createAction, props } from '@ngrx/store';
import { PermissionCreateDto } from '../../models/cabinet/users/dtos/permission/permission-create-dto';
import { Permission } from '../../models/cabinet/users/permission';

export enum PermissionActionTypes {
  GET_PERMISSIONS = '[Permission] Get Permissions',
  GET_PERMISSIONS_SUCCESS = '[Permission] Get Permissions Success',
  GET_PERMISSIONS_FAILURE = '[Permission] Get Permissions Failure',
  CREATE_PERMISSIONS = '[Permission] Create Permission',
  CREATE_PERMISSIONS_SUCCESS = '[Permission] Create Permission Success',
  CREATE_PERMISSIONS_FAILURE = '[Permission] Create Permission Failure',
  EDIT_PERMISSIONS = '[Permission] Edit Permission',
  EDIT_PERMISSIONS_SUCCESS = '[Permission] Edit Permission Success',
  EDIT_PERMISSIONS_FAILURE = '[Permission] Edit Permission Failure',
  REMOVE_PERMISSIONS = '[Permission] Remove Permission',
  REMOVE_PERMISSIONS_SUCCESS = '[Permission] Remove Permission Success',
  REMOVE_PERMISSIONS_FAILURE = '[Permission] Remove Permission Failure',
}

// GET
export class LoadPermissions implements Action {
  readonly type = PermissionActionTypes.GET_PERMISSIONS;
}

export const getPermissions = createAction(
  PermissionActionTypes.GET_PERMISSIONS,
);

export const getPermissionsSuccess = createAction(
  PermissionActionTypes.GET_PERMISSIONS_SUCCESS,
  props<{ permissions: Permission[] }>()
);

export const getPermissionsFailed = createAction(
  PermissionActionTypes.GET_PERMISSIONS_FAILURE,
  props<{ error: string }>()
);

// CREATE
export const createPermission = createAction(
  PermissionActionTypes.CREATE_PERMISSIONS,
  props<{ permission: PermissionCreateDto, apiMessage: string }>()
);

export const createPermissionSuccess = createAction(
  PermissionActionTypes.CREATE_PERMISSIONS_SUCCESS,
  props<{ permission: PermissionCreateDto, apiMessage: string, typeMessage: string }>()
);

export const createPermissionFailed = createAction(
  PermissionActionTypes.CREATE_PERMISSIONS_FAILURE,
  props<{ apiMessage: string, typeMessage: string }>()
);

// EDIT
export const editPermission = createAction(
  PermissionActionTypes.EDIT_PERMISSIONS,
  props<{ permissionId: string, permission: PermissionCreateDto, apiMessage: string }>()
);

export const editPermissionSuccess = createAction(
  PermissionActionTypes.EDIT_PERMISSIONS_SUCCESS,
  props<{ permissionId: string, permission: PermissionCreateDto, apiMessage: string, typeMessage: string }>()
);

export const editPermissionFailed = createAction(
  PermissionActionTypes.EDIT_PERMISSIONS_FAILURE,
  props<{ apiMessage: string, typeMessage: string }>()
);

// REMOVE
export const deletePermission = createAction(
  PermissionActionTypes.REMOVE_PERMISSIONS,
  props<{ permissionId: string, apiMessage: string }>()
);

export const deletePermissionSuccess = createAction(
  PermissionActionTypes.REMOVE_PERMISSIONS_SUCCESS,
  props<{ permissionId: string, apiMessage: string, typeMessage: string }>()
);

export const deletePermissionFailed = createAction(
  PermissionActionTypes.REMOVE_PERMISSIONS_FAILURE,
  props<{ error: any }>()
);
