/* eslint @typescript-eslint/no-var-requires: "off" */
const bcrypt = require('bcrypt');
import { saltRound }  from '../../config/settings';


export const hashPassword = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(parseInt(saltRound));
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = async (password, hashPassword): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
}

