import { Action, createReducer, on } from '@ngrx/store';
import { initialState, RolesState } from './roles.state';
import * as RoleActions from './roles.actions';


const rolesReducer = createReducer(
  initialState,
  on(RoleActions.getRoles, (state) => ({...state})),
  on(RoleActions.getRolesSuccess, (state, { roles }) => ({
    ...state,
    roles: roles,
  })),
  on(RoleActions.createRoleSuccess, (state, { role, apiMessage }) => {
    const updatedRoles = [...state.roles];
    updatedRoles.push(role);
    return {
      ...state,
      roles: updatedRoles,
      apiMessage: apiMessage
    };
  }),
  on(RoleActions.editRoleSuccess, (state, { roleId, role, apiMessage }) => {
    const roleItemIndex = state.roles.findIndex(
      (item) => item._id === roleId
    );
    const updatedRoles = [...state.roles];
    updatedRoles.splice(roleItemIndex, 1);
    updatedRoles.push(role);
    return {
      ...state,
      roles: updatedRoles,
      apiMessage: apiMessage
    };
  }),
  on(RoleActions.removeRoleSuccess, (state, { roleId, apiMessage }) => {
    const roleItemIndex = state.roles.findIndex(
      (item) => item._id === roleId
    );
    const updatedRoles = [...state.roles];
    updatedRoles.splice(roleItemIndex, 1);
    return {
      ...state,
      roles: updatedRoles,
      apiMessage: apiMessage
    };
  })
);

export const getRolesReducer = (state: RolesState) => {
  return {
    roles: state.roles,
  };
};

export const getApiMessageReducer = (state: RolesState) => {
  return {
    apiMessage: state.apiMessage,
    typeMessage: state.typeMessage
  };
};

export function reducer(state: RolesState | undefined, action: Action) {
  return rolesReducer(state, action);
}
