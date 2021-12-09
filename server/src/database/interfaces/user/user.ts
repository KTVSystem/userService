import {Role} from './role';
import {Token} from './token';

export interface User {
    _id?:string,
    email: string;
    nickname: string;
    status: string;
    password: string;
    role?: Role | undefined;
    token?: Token | undefined;
    created: Date;
    updated: Date;
}
