import { UserCreateDto } from '../../../../api/interfaces/user/dtos/user/user-create-dto';

export const userDtoAdmin: UserCreateDto = {
    email: 'user-admin@gmail.com',
    password: '123',
    role: 'Admin',
    status: "active"
}

export const userDtoUser: UserCreateDto = {
    email: 'user-user@gmail.com',
    password: '123',
    role: 'User',
    status: "active"
}
