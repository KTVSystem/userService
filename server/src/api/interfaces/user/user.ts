import {Role} from './role';
import {Token} from './token';

export interface User {
    _id?:string,
    email: string;
    password?: string;
    status: string;
    role?: Role['_id'];
    token?: Token['_id'];
    created: Date;
    updated: Date;
}
