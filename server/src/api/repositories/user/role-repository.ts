import { RoleModel } from '../../models/user/role-model';
import { perPage } from '../../../config/settings';

export const allRoleCount = async (params) => {
    const {name, status} = params;
    let query = RoleModel.find({});

    if (typeof name !== 'undefined') {
        query.find({name: { $regex: '.*' + name + '.*' } });
    }
    if (typeof status !== 'undefined') {
        query.find({ status: status });
    }
    return query.count();
}

export const allByQuery = async (params: any) => {
    const {name, status} = params;

    const page = (typeof params.page !== 'undefined') ? params.page : 1;
    const perPageValue = Number(perPage);
    const skip = (page === 1) ? 0 : (perPageValue * (page - 1));

    let query = RoleModel.find({});
    if (typeof name !== 'undefined') {
        query.find({name: { $regex: '.*' + name + '.*' } });
    }
    if (typeof status !== 'undefined') {
        query.find({ status: status });
    }
    return query.skip(skip).limit(perPageValue).populate('permissions');
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
