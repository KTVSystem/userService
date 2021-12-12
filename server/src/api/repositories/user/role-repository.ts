import { RoleModel } from '../../models/user/role-model';

export const findRoleByName = async (name: string) => {
    const role = (await RoleModel.find({ name: name }).populate('permissions').limit(1))[0];
    if (typeof role !== 'undefined') {
        return role;
    }
    throw new Error('Role doesn\'t exist');
}
