import { Action, createReducer, on } from '@ngrx/store';
import { initialState, PermissionsState } from './permissions.state';
import * as PermissionActions from './permissions.actions';


const permissionsReducer = createReducer(
  initialState,
  on(PermissionActions.getPermissions, (state) => ({...state})),
  on(PermissionActions.getPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    permissions: permissions,
  })),
  on(PermissionActions.createPermissionSuccess, (state, { permission, apiMessage }) => {
    const updatedPermissions = [...state.permissions];
    updatedPermissions.push(permission);
    return {
      ...state,
      permissions: updatedPermissions,
      apiMessage: apiMessage
    };
  }),
  on(PermissionActions.editPermissionSuccess, (state, { permissionId, permission, apiMessage }) => {
    const permissionItemIndex = state.permissions.findIndex(
      (item) => item._id === permissionId
    );
    const updatedPermissions = [...state.permissions];
    updatedPermissions.splice(permissionItemIndex, 1);
    updatedPermissions.push(permission);
    return {
      ...state,
      permissions: updatedPermissions,
      apiMessage: apiMessage
    };
  }),
  on(PermissionActions.deletePermissionSuccess, (state, { permissionId, apiMessage }) => {
    const permissionItemIndex = state.permissions.findIndex(
      (item) => item._id === permissionId
    );
    const updatedPermissions = [...state.permissions];
    updatedPermissions.splice(permissionItemIndex, 1);
    return {
      ...state,
      permissions: updatedPermissions,
      apiMessage: apiMessage
    };
  })
);

export const getPermissionsReducer = (state: PermissionsState) => {
  return {
    permissions: state.permissions,
  };
};

export const getApiMessageReducer = (state: PermissionsState) => {
  return {
    apiMessage: state.apiMessage,
    typeMessage: state.typeMessage
  };
};

export function reducer(state: PermissionsState | undefined, action: Action) {
  return permissionsReducer(state, action);
}
