import { UserCreateDto } from '../../../../api/interfaces/user/dtos/user/user-create-dto';
import { Status } from '../../../../api/interfaces/base/enums/status';

export const userDtoAdmin: UserCreateDto = {
    email: 'user-admin@gmail.com',
    password: '123',
    role: 'Admin',
    status: Status.ACTIVE
}

export const userDtoUser: UserCreateDto = {
    email: 'user-user@gmail.com',
    password: '123',
    role: 'User',
    status: Status.ACTIVE
}

export const userDtoModerator: UserCreateDto = {
    email: 'user-moderator@gmail.com',
    password: '123',
    role: 'Moderator',
    status: Status.ACTIVE
}
