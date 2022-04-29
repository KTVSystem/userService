import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoles from './roles.reducer';
import { RolesState } from './roles.state';
import { Role } from '../../models/cabinet/users/role';

export const selectRoles = createFeatureSelector<RolesState>('roles');

export const selectRolesItems = createSelector(
  selectRoles,
  fromRoles.getRolesReducer
);

export const selectRoleItem = (props: { id: string }) =>
  createSelector(selectRolesItems, (roles) =>
    roles.roles.find((role: Role) => role._id === props.id)
  );

export const selectApiMessageItem = createSelector(
  selectRoles,
  fromRoles.getApiMessageReducer
);
