import { User } from '../../models/cabinet/users/user';

export interface UsersState {
  users: User[];
  apiMessage: string;
  typeMessage: string;
}

export const initialState: UsersState = {
  users: [],
  apiMessage: '',
  typeMessage: '',
};
