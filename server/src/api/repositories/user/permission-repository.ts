import { perPage } from '../../../config/settings';
import { PermissionModel } from '../../models/user/permission-model';

export const allPermissionCount = async (params) => {
    const {name, status} = params;
    let query = PermissionModel.find({});

    if (typeof name !== 'undefined') {
        query.find({name: { $regex: '.*' + name + '.*' } });
    }
    if (typeof status !== 'undefined') {
        query.find({ status: status });
    }
    return query.count();
}

export const allByQueryFilter = async (params: any) => {
    const {name, status} = params;

    const page = (typeof params.page !== 'undefined') ? params.page : 1;
    const perPageValue = Number(perPage);
    const skip = (page === 1) ? 0 : (perPageValue * (page - 1));

    let query = PermissionModel.find({});
    if (typeof name !== 'undefined') {
        query.find({name: { $regex: '.*' + name + '.*' } });
    }
    if (typeof status !== 'undefined') {
        query.find({ status: status });
    }
    return query.skip(skip).limit(perPageValue);
}

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

export const getMultiplePermissionsByIds = async (permissionsIds: Array<string>) => {
    return PermissionModel.find({ '_id': { $in: permissionsIds } });
}
