import { Schema, model } from 'mongoose';
import { Permission } from '../../interfaces/user/permission';

const schema = new Schema<Permission>({
    name: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20 },
    created: { type: Date, required: false},
    updated: { type: Date, required: false},
}, {
    versionKey: false
});

export const PermissionModel = model<Permission>('Permission', schema);
