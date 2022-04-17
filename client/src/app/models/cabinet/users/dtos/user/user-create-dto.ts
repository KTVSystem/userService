import { Role } from '../../role';

export interface UserCreateDto {
  email: string;
  password: string;
  role: Role;
  status: string;
}
