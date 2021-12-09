import * as PasswordService from '../../services/password-service';
import * as JwtService from '../../services/auth/jwt-service';
import { UserModel, findByNickname } from '../../../database/models/user/user-model';
import { Status } from '../../../database/enums/status';
import { TokenModel, removeTokenEntry } from '../../../database/models/user/token-model';
import { User } from '../../../database/interfaces/user/user';

export const signup = async (email, nickname, password): Promise<User> => {
    const passwordHash = await PasswordService.hashPassword(password);
    const userContract: User = {
        email: email,
        nickname: nickname,
        password: passwordHash,
        status: Status.NEW,
        created: new Date(),
        updated: new Date(),
    };
    const user = await UserModel.create(userContract);
    const tokenHash = await JwtService.createToken(user);
    user.token = await TokenModel.create({hash: tokenHash, status: Status.ACTIVE});
    await user.updateOne(user);
    return user;
}

export const loginUser = async (nickname, password): Promise<User> => {
    const user = await findByNickname(nickname);
    if (user && await PasswordService.comparePassword(password, user.password)) {
        const tokenHash = await JwtService.createToken(user);

        if (typeof user.token !== 'undefined') {
            await removeTokenEntry(user.token);
        }

        user.token = await TokenModel.create({hash: tokenHash, status: Status.ACTIVE});
        await user.updateOne(user);
        return user;
    }
    throw new Error('Wrong nickname or password');
}
