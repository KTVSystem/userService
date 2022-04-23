import { RoleModel } from '../../models/user/role-model';
import { translate } from '../../services/translate/translateService';

export const allByQuery = async () => {
    return RoleModel.find({}).populate('permissions');
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
