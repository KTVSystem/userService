import { PermissionModel } from '../../../../api/models/user/permission-model';
import { permissionDto } from '../dtos/permissionDto';

export const buildPermission = async () => {
    return await PermissionModel.create({
        name: permissionDto.name,
        status: permissionDto.status,
        created: new Date(),
        updated: new Date(),
    });
}
