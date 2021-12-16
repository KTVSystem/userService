import { Social } from '../../social';
import { Permission } from '../../permission';
import { Role } from '../../role';

export interface UserDetailDto {
  email: string;
  _id: number;
  role: Role;
  social: Array<Social>;
  permission: Array<Permission>;
  status: string;
}
