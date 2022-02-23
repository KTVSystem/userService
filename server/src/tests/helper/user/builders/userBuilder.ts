import { userDtoAdmin, userDtoModerator, userDtoUser } from '../dtos/userDto';
import * as PasswordService from '../../../../api/services/password-service';
import { UserModel } from '../../../../api/models/user/user-model';
import { Status } from '../../../../api/interfaces/base/enums/status';

export const buildUserAdmin = async (role) => {
    const passwordHashAdmin = await PasswordService.hashPassword(userDtoAdmin.password);
    return await UserModel.create({
        email: userDtoAdmin.email,
        password: passwordHashAdmin,
        status: Status.ACTIVE,
        role,
        wrong: 0,
        blockTime: null,
        created: new Date(),
        updated: new Date(),
    });
}

export const buildUserUser = async (role, socials = []) => {
    const passwordHashUser = await PasswordService.hashPassword(userDtoUser.password);
    return await UserModel.create({
        email: userDtoUser.email,
        password: passwordHashUser,
        status: Status.ACTIVE,
        role,
        socials,
        wrong: 0,
        blockTime: null,
        created: new Date(),
        updated: new Date(),
    });
}

export const buildUserModerator = async (role) => {
    const passwordHashAdmin = await PasswordService.hashPassword(userDtoModerator.password);
    return await UserModel.create({
        email: userDtoModerator.email,
        password: passwordHashAdmin,
        status: Status.ACTIVE,
        role,
        wrong: 0,
        blockTime: null,
        created: new Date(),
        updated: new Date(),
    });
}
