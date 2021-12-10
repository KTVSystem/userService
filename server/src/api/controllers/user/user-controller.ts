import {all, findById} from '../../../database/models/user/user-model';
import { User } from '../../../database/interfaces/user/user';

export const getUsers = async (): Promise<User[]> => {
    return await all();
}

export const getUser = async (id: string): Promise<User> => {
    return await findById(id);
}
