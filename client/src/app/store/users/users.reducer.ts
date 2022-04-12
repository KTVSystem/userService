import { Action, createReducer, on } from '@ngrx/store';
import { initialState, UsersState } from './users.state';
import * as UserActions from './users.actions';


const usersReducer = createReducer(
  initialState,
  on(UserActions.getUsers, (state) => ({...state})),
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),
);

export const getUsersReducer = (state: UsersState) => {
  return {
    users: state.users,
  };
};

export function reducer(state: UsersState | undefined, action: Action) {
  return usersReducer(state, action);
}
