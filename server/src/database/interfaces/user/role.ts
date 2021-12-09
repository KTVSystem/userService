import { Permission } from './permission';

export interface Role {
    name: string;
    status: string;
    permissions: Permission[];
    created: Date;
    updated: Date;
}
