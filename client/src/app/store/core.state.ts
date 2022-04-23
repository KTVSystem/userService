import { UsersState } from './users';
import { PermissionsState } from './permissions';
import { RolesState } from './roles';


export interface State {
  users: UsersState;
  permissions: PermissionsState;
  roles: RolesState;
}
