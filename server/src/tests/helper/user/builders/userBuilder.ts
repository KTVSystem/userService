import { userDtoAdmin, userDtoUser } from '../dtos/userDto';
import * as PasswordService from '../../../../api/services/password-service';
import { UserModel } from '../../../../api/models/user/user-model';
import { Status } from '../../../../api/interfaces/base/enums/status';

export const buildUserAdmin = async (role) => {
    const passwordHashAdmin = await PasswordService.hashPassword(userDtoAdmin.password);
    return await UserModel.create({
        email: userDtoAdmin.email,
        password: passwordHashAdmin,
        status: Status.ACTIVE,
        role: role,
        created: new Date(),
        updated: new Date(),
    });
}

export const buildUserUser = async (role) => {
    const passwordHashUser = await PasswordService.hashPassword(userDtoUser.password);
    return await UserModel.create({
        email: userDtoUser.email,
        password: passwordHashUser,
        status: Status.ACTIVE,
        role: role,
        created: new Date(),
        updated: new Date(),
    });
}
