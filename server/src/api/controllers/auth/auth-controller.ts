import * as PasswordService from '../../services/password-service';
import * as JwtService from '../../services/auth/jwt-service';
import { findUserByEmail, findUserById } from '../../repositories/user/user-repository';
import { Status } from '../../interfaces/base/enums/status';
import { TokenModel } from '../../models/user/token-model';
import { User } from '../../interfaces/user/user';
import { removeTokenEntry } from '../../repositories/user/token-repository';

export const loginUser = async (email, password): Promise<User> => {
    const user = await findUserByEmail(email);
    if (user && await PasswordService.comparePassword(password, user.password)) {
        const tokenHash = await JwtService.createToken(user);

        if (typeof user.token !== 'undefined') {
            await removeTokenEntry(user.token.hash);
        }

        user.token = await TokenModel.create({hash: tokenHash, status: Status.ACTIVE});
        await user.updateOne(user);
        return user;
    }
    throw new Error('Wrong email or password');
}

export const checkToken = async (token: string): Promise<boolean> => {
    const tokenDecoded = await JwtService.decodeToken(token);
    if (!tokenDecoded) return false;
    const user = await findUserById(tokenDecoded.id);
    const result = await checkTokenExpiredDate(tokenDecoded.iat);
    return !(!user && user.token !== tokenDecoded.id && !result);
}

const checkTokenExpiredDate = async (loginDate: number) => {
    const currentDate = Date.now();
    return ((currentDate - loginDate) < 86400000);
}
