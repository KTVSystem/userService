import { Permission } from '../../models/cabinet/users/permission';

export interface PermissionsState {
  permissions: Permission[];
  apiMessage: string;
  typeMessage: string;
}

export const initialState: PermissionsState = {
  permissions: [],
  apiMessage: '',
  typeMessage: '',
};
