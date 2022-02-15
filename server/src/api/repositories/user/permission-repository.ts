import { PermissionModel } from '../../models/user/permission-model';
import { translate } from '../../services/translate/translateService';

export const allByQueryFilter = async (params: never) => {
    const {name, status} = params;
    const query = PermissionModel.find({});
    if (typeof name !== 'undefined') {
        query.find({name: { $regex: '.*' + name + '.*' } });
    }
    if (typeof status !== 'undefined') {
        query.find({ status });
    }
    return query;
}

export const allByQuery = async () => {
    return PermissionModel.find({});
}

export const findPermissionById = async (id: string, lang: string) => {
    const permission = (await PermissionModel.find({ _id: id }).limit(1))[0];
    if (typeof permission !== 'undefined') {
        return permission;
    }
    throw new Error(await translate(lang, 'permissionNotExist'));
}

export const removePermissionById = async (id: string) => {
    return PermissionModel.findOneAndRemove({_id: id});
}

export const getMultiplePermissionsByIds = async (permissionsIds: string[]) => {
    return PermissionModel.find({ _id: { $in: permissionsIds } });
}
