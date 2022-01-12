import { Permission } from './permission';

export interface Role {
  _id: number;
  name: string;
  status: string;
  permissions?: Permission[];
  created?: string;
  updated?: string;
}
