import { PermissionDto } from '../../../../api/interfaces/user/dtos/permission/permission-dto';
import { Status } from '../../../../api/interfaces/base/enums/status';

export const permissionDto: PermissionDto = {
    name: 'Permission 1',
    status: Status.ACTIVE
}
