import { Action, createReducer, on } from '@ngrx/store';
import { initialState, UsersState } from './users.state';
import * as UserActions from './users.actions';
import {User} from '../../models/cabinet/users/user';
import {UserCreateDto} from '../../models/cabinet/users/dtos/user/user-create-dto';


const usersReducer = createReducer(
  initialState,
  on(UserActions.getUsers, (state) => ({...state})),
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(UserActions.addUserSuccess, (state, { apiMessage }) => ({
    ...state,
    apiMessage: apiMessage,
  })),
  on(UserActions.deleteUserSuccess, (state, { userId, apiMessage }) => {
    const userItemIndex = state.users.findIndex(
      (item) => item._id === userId
    );
    const updatedUsers = [...state.users];
    updatedUsers.splice(userItemIndex, 1);
    return {
      ...state,
      users: updatedUsers,
      apiMessage: apiMessage
    };
  })
);

export const getUsersReducer = (state: UsersState) => {
  return {
    users: state.users,
  };
};

export const getApiMessageReducer = (state: UsersState) => {
  return {
    apiMessage: state.apiMessage,
  };
};

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
