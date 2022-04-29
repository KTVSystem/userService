import { allByQuery, findRoleById, removeRoleById } from '../../repositories/user/role-repository';
import { getMultiplePermissionsByIds } from '../../repositories/user/permission-repository';
import { Role } from '../../interfaces/user/role';
import { RoleDto } from '../../interfaces/user/dtos/role/role-dto';
import { RoleModel } from '../../models/user/role-model';

export const getRoles = async () => {
    return await allByQuery();
}

export const getPermission = async (id: string): Promise<Role> => {
    return await findRoleById(id);
}

export const createRole = async (roleDto: RoleDto) => {
    const permissions = roleDto.permissions.length ? await getMultiplePermissionsByIds(roleDto.permissions) : [];
    return await RoleModel.create({
        name: roleDto.name,
        status: roleDto.status,
        permissions,
        created: new Date(),
        updated: new Date(),
    });
}

export const editRole = async (id: string, roleDto: RoleDto): Promise<Role> => {
    const permissions = roleDto.permissions.length ? await getMultiplePermissionsByIds(roleDto.permissions) : [];
    const role = await findRoleById(id);
    role.name = roleDto.name;
    role.status = roleDto.status;
    role.permissions = permissions;
    role.updated = new Date();
    await role.updateOne(role);
    return role;
}

export const deleteRole = async (id: string): Promise<void> => {
    await removeRoleById(id);
}
