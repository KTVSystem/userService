import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { UsersState } from './users.state';

export const selectUsers = createFeatureSelector<UsersState>('users');

export const selectUserItems = createSelector(
  selectUsers,
  fromUsers.getUsersReducer
);
