import { Role } from '../../models/cabinet/users/role';

export interface RolesState {
  roles: Role[];
  apiMessage: string;
  typeMessage: string;
}

export const initialState: RolesState = {
  roles: [],
  apiMessage: '',
  typeMessage: '',
};
