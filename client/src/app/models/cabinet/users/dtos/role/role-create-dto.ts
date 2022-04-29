import { Permission } from '../../permission';

export interface RoleCreateDto {
  name: string;
  status: string;
  permissions?: Permission[];
}
