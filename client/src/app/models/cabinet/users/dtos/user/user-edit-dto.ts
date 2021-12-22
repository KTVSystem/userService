import { Role } from '../../role';

export interface UserEditDto {
  email: string;
  role: Role;
  status: string;
}
