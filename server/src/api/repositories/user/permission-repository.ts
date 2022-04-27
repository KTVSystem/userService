import { PermissionModel } from '../../models/user/permission-model';

export const allByQuery = async () => {
    return PermissionModel.find({});
}

export const findPermissionById = async (id: string) => {
    const permission = (await PermissionModel.find({ _id: id }).limit(1))[0];
    if (typeof permission !== 'undefined') {
        return permission;
    }
    throw new Error('Permission doesn\'t exist');
}

export const removePermissionById = async (id: string) => {
    return PermissionModel.findOneAndRemove({_id: id});
}

export const getMultiplePermissionsByIds = async (permissionsIds: string[]) => {
    return PermissionModel.find({ _id: { $in: permissionsIds } });
}
