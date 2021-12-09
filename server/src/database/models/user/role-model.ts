import { Schema, model } from 'mongoose';
import { Role } from '../../interfaces/user/role';

const schema = new Schema<Role>({
    name: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20},
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const RoleModel = model<Role>('Role', schema);
