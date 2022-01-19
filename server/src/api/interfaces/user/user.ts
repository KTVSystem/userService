import { Role } from './role';
import { Token } from './token';
import { SocialUser } from './social-user';

export interface User {
    _id?: string,
    email: string;
    password?: string;
    status: string;
    role?: Role;
    token?: Token;
    socials?: SocialUser[];
    created: Date;
    updated: Date;
}
