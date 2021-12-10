import { Social } from './social';
import { Permission } from './permission';
import { Role } from './role';

export interface User {
  email: string;
  _id?: number;
  role: Role;
  social?: Array<Social>;
  permission?: Array<Permission>;
  status: string;
  token?: string;
  username?: string;
  password?: string;
}
