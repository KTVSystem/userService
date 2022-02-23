import { RoleModel } from '../../models/user/role-model';
import { translate } from '../../services/translate/translateService';

export const allByQuery = async (params: any) => {
    const {name, status} = params;

    const query = RoleModel.find({});
    if (typeof name !== 'undefined') {
        query.find({name: { $regex: '.*' + name + '.*' } });
    }
    if (typeof status !== 'undefined') {
        query.find({ status });
    }
    return query.populate('permissions');
}

export const findRoleById = async (id: string, lang: string) => {
    const role = (await RoleModel.find({ _id: id }).populate('permissions').limit(1))[0];
    if (typeof role !== 'undefined') {
        return role;
    }
    throw new Error(await translate(lang, 'roleNotExist'));
}

export const findRoleByName = async (name: string, lang: string) => {
    const role = (await RoleModel.find({ name }).populate('permissions').limit(1))[0];
    if (typeof role !== 'undefined') {
        return role;
    }
    throw new Error(await translate(lang, 'roleNotExist'));
}

export const removeRoleById = async (id: string) => {
    return RoleModel.findOneAndRemove({_id: id});
}
