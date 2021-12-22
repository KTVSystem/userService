import { UserModel } from '../../models/user/user-model';
import { findRoleByName } from './role-repository';
import { perPage }  from '../../../config/settings';

export const findUserByEmail = async (email: string) => {
    const user = (await UserModel.find({ email: email }).populate('role').limit(1))[0];
    if (typeof user !== 'undefined') {
        return user;
    }
    throw new Error('User doesn\'t exist');
}

export const all = async () => {
    return UserModel.find({}).populate('role').populate('token');
}

export const allUsersCount = async (params) => {
    const {email, role, status} = params;
    let query = UserModel.find({});

    if (typeof email !== 'undefined') {
        query.find({email: { $regex: '.*' + email + '.*' } });
    }
    if (typeof role !== 'undefined') {
        const roleObj  = await findRoleByName(role);
        query.find({ role: roleObj._id });
    }
    if (typeof status !== 'undefined') {
        query.find({ status: status });
    }
    return query.count();
}

export const allByQuery = async (params: any) => {
    const {email, role, status} = params;

    const page = (typeof params.page !== 'undefined') ? params.page : 1;
    const perPageValue = Number(perPage);
    const skip = (page === 1) ? 0 : (perPageValue * (page - 1));

    let query = UserModel.find({});
    if (typeof email !== 'undefined') {
        query.find({email: { $regex: '.*' + email + '.*' } });
    }
    if (typeof role !== 'undefined') {
        const roleObj  = await findRoleByName(role);
        query.find({ role: roleObj._id });
    }
    if (typeof status !== 'undefined') {
        query.find({ status: status });
    }
    return query.skip(skip).limit(perPageValue).populate('role').populate('token');
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