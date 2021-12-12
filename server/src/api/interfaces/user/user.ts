import { Role } from './role';
import { Token } from './token';

export interface User {
    _id?:string,
    email: string;
    password?: string;
    status: string;
    role?: Role;
    token?: Token;
    created: Date;
    updated: Date;
}
