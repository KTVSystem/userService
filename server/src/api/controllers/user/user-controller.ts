import { allByQuery, findUserById, removeUserById } from '../../repositories/user/user-repository';
import { findRoleByName } from '../../repositories/user/role-repository';
import { User } from '../../interfaces/user/user';
import { UserCreateDto } from '../../interfaces/user/dtos/user/user-create-dto';
import { UserModel } from '../../models/user/user-model';
import { Status } from '../../interfaces/base/enums/status';
import * as PasswordService from '../../services/password-service';
import { UserEditDto } from '../../interfaces/user/dtos/user/user-edit-dto';
import { UserChangePasswordDto } from '../../interfaces/user/dtos/user/user-change-password-dto';
import { removeSocialById } from '../../repositories/user/social-user-repository';
import { socialCount } from '../../../config/settings';
import {SocialUser} from '../../interfaces/user/social-user';

export const getUsers = async (params: any) => {
    return await allByQuery(params);
}

export const getUser = async (id: string): Promise<User> => {
    return await findUserById(id);
}

export const createUser = async (userDto: UserCreateDto): Promise<User> => {
    const passwordHash = await PasswordService.hashPassword(userDto.password);
    const role = await findRoleByName(userDto.role);
    return await UserModel.create({
        email: userDto.email,
        password: passwordHash,
        status: Status.ACTIVE,
        role: role,
        created: new Date(),
        updated: new Date(),
    });
}

export const editUser = async (id: string, userDto: UserEditDto): Promise<User> => {
    const user = await findUserById(id);
    const role = await findRoleByName(userDto.role);
    user.email = userDto.email;
    user.status = userDto.status;
    user.role = role;
    user.updated = new Date();
    await user.updateOne(user);
    return user;
}

export const changePassword = async (id: string, userDto: UserChangePasswordDto): Promise<User> => {
    const user = await findUserById(id);
    user.password = await PasswordService.hashPassword(userDto.password);
    user.updated = new Date();
    await user.updateOne(user);
    return user;
}

export const unbindSocial = async (id: string, social: string): Promise<string> => {
    const user = await findUserById(id);
    await removeSocialById(social);
    if (user.socials.length < Number(socialCount)) {
        await removeUserById(id);
        return 'User was deleted!';
    } else {
        return 'Social account was unbinded!';
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    const user = await findUserById(id);
    if (user.socials.length) {
        for (const social of user.socials) {
            await removeSocialById(social.id);
        }
    }
    await removeUserById(id);
};
