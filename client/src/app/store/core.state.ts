import { UsersState } from './users';
import { PermissionsState } from './permissions';


export interface State {
  users: UsersState;
  permissions: PermissionsState;
}
