import { RoleDto } from '../../../../api/interfaces/user/dtos/role/role-dto';
import { Status } from '../../../../api/interfaces/base/enums/status';

export const roleAdminDto: RoleDto = {
    name: 'Admin',
    status: Status.ACTIVE
}

export const roleUserDto: RoleDto = {
    name: 'User',
    status: Status.ACTIVE
}

export const roleModeratorDto: RoleDto = {
    name: 'Moderator',
    status: Status.ACTIVE
}
