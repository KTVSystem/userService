import { User } from '../../models/cabinet/users/user';

export interface UsersState {
  users: User[];
  apiMessage: string;
}

export const initialState: UsersState = {
  users: [],
  apiMessage: ''
};
