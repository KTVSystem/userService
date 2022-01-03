import { RoleModel } from '../../../../api/models/user/role-model';
import { roleAdminDto, roleUserDto } from '../dtos/roleDto';


export const buildRoleAdmin = async () => {
    return await RoleModel.create({
        name: roleAdminDto.name,
        status: roleAdminDto.status,
        permissions: [],
        created: new Date(),
        updated: new Date(),
    });
}

export const buildRoleUser = async () => {
    return await RoleModel.create({
        name: roleUserDto.name,
        status: roleUserDto.status,
        permissions: [],
        created: new Date(),
        updated: new Date(),
    });
}
