import { all, findUserById, removeUserById } from '../../repositories/user/user-repository';
import { findRoleByName } from '../../repositories/user/role-repository';
import { User } from '../../interfaces/user/user';
import { UserCreateDto } from '../../interfaces/user/dtos/user-create-dto';
import { UserModel } from '../../models/user/user-model';
import { Status } from '../../interfaces/base/enums/status';
import * as PasswordService from '../../services/password-service';
import { UserEditDto } from '../../interfaces/user/dtos/user-edit-dto';
import { UserChangePasswordDto } from '../../interfaces/user/dtos/user-change-password-dto';

export const getUsers = async (): Promise<User[]> => {
    return await all();
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

export const deleteUser = async (id: string): Promise<void> => {
    await removeUserById(id);
}
