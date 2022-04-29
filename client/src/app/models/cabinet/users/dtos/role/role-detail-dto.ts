import { Permission } from '../../permission';

export interface RoleDetailDto {
  _id: string;
  name: string;
  status: string;
  permissions: Permission[];
}
