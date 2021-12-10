import jwt from 'json-web-token';
import { User } from '../../../database/interfaces/user/user';
import { secret }  from '../../../config/settings';

export const createToken = async (user: User) => {
    const timeDay = 86400000;
    const payload = {
        "id": user._id,
        "email": user.email,
        "role": user.role.name,
        "iat": Date.now(),
        "exp": Date.now() + (timeDay * 7),
    };
    return jwt.encode(secret, payload, 'HS512',(err, token) => {
        if (err) {
            console.error(err.name, err.message);
        } else {
            return token;
        }
    });
};
