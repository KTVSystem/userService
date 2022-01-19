import { Permission } from './permission';
import { Role } from './role';
import { SocialUser } from '../../login/social-user';

export interface User {
  email: string;
  _id?: number;
  role: Role;
  social?: Array<SocialUser>;
  permission?: Array<Permission>;
  status: string;
  token?: string;
  username?: string;
  password?: string;
}
