import * as PasswordService from '../../services/password-service';
import * as JwtService from '../../services/auth/jwt-service';
import { findUserByEmail, findUserByEmailWithoutExc, findUserById, encreaseAttemp, blockUser, unBlock }
    from '../../repositories/user/user-repository';
import { Status } from '../../interfaces/base/enums/status';
import { Roles } from '../../interfaces/base/enums/roles';
import { TokenModel } from '../../models/user/token-model';
import { User } from '../../interfaces/user/user';
import { removeTokenEntry } from '../../repositories/user/token-repository';
import { AuthTypes } from '../../interfaces/base/enums/auth-types';
import { SocialUser } from '../../interfaces/user/social-user';
import { findSocialById } from '../../repositories/user/social-user-repository';
import { findRoleByName } from '../../repositories/user/role-repository';
import { UserModel } from '../../models/user/user-model';
import { SocialUserModel } from '../../models/user/social-user-model';

export const loginUser = async (email: string, password: string, type: string): Promise<User> => {
    const user = await findUserByEmail(email);
    if (typeof user === 'undefined') {
        throw new Error('Wrong email or password');
    }
    if (user.blockTime && await checkBlockTime(user.blockTime)) {
        throw new Error('User was blocked on 5 min');
    }
    if (user && await PasswordService.comparePassword(password, user.password)) {
        if (user.wrong > 0) {
            await unBlock(user);
        }
        await checkAdminAccess(type, user.role.name);
        const tokenHash = await JwtService.createToken(user);
        if (typeof user.token !== 'undefined') {
            await removeTokenEntry(user.token.hash);
        }
        user.token = await TokenModel.create({hash: tokenHash, status: Status.ACTIVE});
        await user.updateOne(user);
        return user;
    }

    if (user.wrong === 4) {
        await blockUser(user);
        throw new Error('User was blocked on 5 min');
    } else {
        await encreaseAttemp(user);
        throw new Error('Wrong email or password');
    }
};

export const loginSocialUser = async (socialUser: SocialUser, type: string): Promise<User> => {
    let user = await findUserByEmailWithoutExc(socialUser.email);
    let social = await findSocialById(socialUser.id);
    let newSocial = false;

    if (typeof social === 'undefined') {
        newSocial = true;
        social = await SocialUserModel.create({
            id: socialUser.id,
            email: socialUser.email,
            firstName: socialUser.firstName,
            lastName: socialUser.lastName,
            photoUrl: socialUser.photoUrl,
            provider: socialUser.provider,
            status: Status.ACTIVE,
            created: new Date(),
            updated: new Date(),
        });
    }

    if (typeof user === 'undefined') {
        const role = await findRoleByName(Roles.USER);
        user = await UserModel.create({
            email: socialUser.email,
            status: Status.ACTIVE,
            role,
            created: new Date(),
            updated: new Date(),
        });
    }

    if (newSocial) {
        user.socials = [...user.socials, social];
    }

    // await checkAdminAccess(type, user.role.name);
    const tokenHash = await JwtService.createToken(user);
    if (typeof user.token !== 'undefined') {
        await removeTokenEntry(user.token.hash);
    }
    user.token = await TokenModel.create({hash: tokenHash, status: Status.ACTIVE});
    await user.updateOne(user);
    return user;
};

const checkAdminAccess = async (type: string, role: string): Promise<void> => {
    if (type === AuthTypes.ADMIN && role !== AuthTypes.ADMIN) {
        throw new Error('User does not have permission level!');
    }
};

export const checkToken = async (token: string): Promise<boolean> => {
    const tokenDecoded = await JwtService.decodeToken(token);
    if (!tokenDecoded) { return false; }
    const user = await findUserById(tokenDecoded.id);
    const result = await checkTokenExpiredDate(tokenDecoded.iat);
    return !(!user && user.token !== tokenDecoded.id && !result);
}

const checkTokenExpiredDate = async (loginDate: number): Promise<boolean> => {
    const currentDate = Date.now();
    return ((currentDate - loginDate) < 86400000);
}

const checkBlockTime = async (blockTime: Date): Promise<boolean> => {
    const currentTime = new Date().getTime();
    return !(currentTime > blockTime.getTime());
};
