import { RoleModel } from '../../models/user/role-model';

export const allByQuery = async () => {
    return RoleModel.find({}).populate('permissions');
}

export const findRoleById = async (id: string) => {
    const role = (await RoleModel.find({ _id: id }).populate('permissions').limit(1))[0];
    if (typeof role !== 'undefined') {
        return role;
    }
    throw new Error('Role doesn\'t exist');
}

export const findRoleByName = async (name: string) => {
    const role = (await RoleModel.find({ name }).populate('permissions').limit(1))[0];
    if (typeof role !== 'undefined') {
        return role;
    }
    throw new Error('Role doesn\'t exist');
}

export const removeRoleById = async (id: string) => {
    return RoleModel.findOneAndRemove({_id: id});
}
