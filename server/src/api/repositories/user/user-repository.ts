import { UserModel } from '../../models/user/user-model';
import { findRoleByName } from './role-repository';
import { translate } from '../../services/translate/translateService';
import { blockAccountTime } from '../../../config/settings';

export const findUserByEmail = async (email: string) => {
    return (await UserModel.find({ email }).populate('role').populate('socials')
        .limit(1))[0];
}

export const findUserByEmailWithoutExc = async (email: string) => {
    return (await UserModel.find({ email }).populate('role').populate('socials')
        .limit(1))[0];
}

export const all = async () => {
    return UserModel.find({}).populate('role').populate('token').populate('socials');
}

export const allByQuery = async (params: any, lang: string) => {
    const {email, role, status} = params;

    const query = UserModel.find({});
    if (typeof email !== 'undefined') {
        query.find({email: { $regex: '.*' + email + '.*' } });
    }
    if (typeof role !== 'undefined') {
        const roleObj  = await findRoleByName(role, lang);
        query.find({ role: roleObj._id });
    }
    if (typeof status !== 'undefined') {
        query.find({ status });
    }
    return query.populate('role').populate('token');
}

export const findUserById = async (id: string, lang?: string) => {
    const user = (await UserModel.find({ _id: id }).populate('role').populate('token').populate('socials')
        .limit(1))[0];
    if (typeof user !== 'undefined') {
        return user;
    }
    throw new Error(await translate(lang, 'userNotExist'));
}

export const removeUserById = async (id: string) => {
    return UserModel.findOneAndRemove({_id: id});
}

export const encreaseAttemp = async (user: any) => {
    if (user.wrong === 5) {
        user.wrong = 1;
        user.blockTime = null;
    } else {
        user.wrong = user.wrong + 1;
    }
    user.updated = new Date();
    await user.updateOne(user);
}

export const blockUser = async (user: any) => {
    user.wrong = user.wrong + 1;
    user.blockTime = await addMinutesToDate(new Date(), blockAccountTime);
    user.updated = new Date();
    await user.updateOne(user);
}

export const unBlock = async (user: any) => {
    user.wrong = 0;
    user.blockTime = null;
    user.updated = new Date();
    await user.updateOne(user);
}

const addMinutesToDate = async (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
}
