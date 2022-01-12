import { RoleModel } from '../../models/user/role-model';

export const allByQuery = async (params: any) => {
    const {name, status} = params;

    let query = RoleModel.find({});
    if (typeof name !== 'undefined') {
        query.find({name: { $regex: '.*' + name + '.*' } });
    }
    if (typeof status !== 'undefined') {
        query.find({ status: status });
    }
    return query.populate('permissions');
}

export const findRoleById = async (id: string) => {
    const role = (await RoleModel.find({ _id: id }).populate('permissions').limit(1))[0];
    if (typeof role !== 'undefined') {
        return role;
    }
    throw new Error('Role doesn\'t exist');
}

export const findRoleByName = async (name: string) => {
    const role = (await RoleModel.find({ name: name }).populate('permissions').limit(1))[0];
    if (typeof role !== 'undefined') {
        return role;
    }
    throw new Error('Role doesn\'t exist');
}

export const removeRoleById = async (id: string) => {
    return RoleModel.findOneAndRemove({_id: id});
}
