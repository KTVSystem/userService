import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from "./core.state";
import * as UsersReducer from './users/users.reducer';
import * as PermissionsReducer from './permissions/permissions.reducer';
import { environment } from '../../environments/environment';

export const reducers: ActionReducerMap<State> = {
  users: UsersReducer.reducer,
  permissions: PermissionsReducer.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
