import { User } from '../../interfaces/user/user';
import { UserModel } from '../../models/user/user-model';

export const findByEmail = async (email: string) => {
    const user = (await UserModel.find({ email: email }).populate('role').limit(1))[0];
    if (typeof user !== 'undefined') {
        return user;
    }
    throw new Error('User doesn\'t exist');
}

export const all = async () => {
    return UserModel.find({}).populate('role').populate('token') as User[];
}

export const findUserById = async (id: string) => {
    const user = (await UserModel.find({ _id: id }).populate('role').populate('token').limit(1))[0];
    if (typeof user !== 'undefined') {
        return user;
    }
    throw new Error('User doesn\'t exist');
}

export const removeUserById = async (id: string) => {
    return UserModel.findOneAndRemove({_id: id});
}
