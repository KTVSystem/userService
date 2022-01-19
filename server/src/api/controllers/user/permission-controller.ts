import {
    allByQuery, allByQueryFilter,
    findPermissionById,
    removePermissionById
} from '../../repositories/user/permission-repository';
import { Permission } from '../../interfaces/user/permission';
import { PermissionDto } from '../../interfaces/user/dtos/permission/permission-dto';
import { PermissionModel } from '../../models/user/permission-model';

export const getPermissions = async (params: never) => {
    return await allByQueryFilter(params);
}

export const getPermissionsAll = async () => {
    return await allByQuery();
}

export const getPermission = async (id: string): Promise<Permission> => {
    return await findPermissionById(id);
}

export const createPermission = async (permissionDto: PermissionDto): Promise<Permission> => {
    return await PermissionModel.create({
        name: permissionDto.name,
        status: permissionDto.status,
        created: new Date(),
        updated: new Date(),
    });
}

export const editPermission = async (id: string, permissionDto: PermissionDto): Promise<Permission> => {
    const permission = await findPermissionById(id);
    permission.name = permissionDto.name;
    permission.status = permissionDto.status;
    permission.updated = new Date();
    await permission.updateOne(permission);
    return permission;
}

export const deletePermission = async (id: string): Promise<void> => {
    await removePermissionById(id);
}
