import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { UsersState } from './users.state';
import { User } from '../../models/cabinet/users/user';

export const selectUsers = createFeatureSelector<UsersState>('users');

export const selectUserItems = createSelector(
  selectUsers,
  fromUsers.getUsersReducer
);

export const selectUserItem = (props: { id: string }) =>
  createSelector(selectUserItems, (users) =>
    users.users.find((user: User) => user._id === props.id)
  );

export const selectApiMessageItem = createSelector(
  selectUsers,
  fromUsers.getApiMessageReducer
);
