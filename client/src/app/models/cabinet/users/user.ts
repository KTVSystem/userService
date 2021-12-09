import { Social } from './social';
import { Permission } from './permission';

export interface User {
  email: string;
  id?: number;
  roles: string;
  social?: Array<Social>;
  permission?: Array<Permission>;
  status: string;
  token?: string;
  username?: string;
  password?: string;
}
