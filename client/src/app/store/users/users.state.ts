import { User } from '../../models/cabinet/users/user';

export interface UsersState {
  users: User[];
}

export const initialState: UsersState = {
  users: [],
};
