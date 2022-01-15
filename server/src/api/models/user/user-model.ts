import { Schema, model } from 'mongoose';
import { User } from '../../interfaces/user/user';

const schema = new Schema<User>({
    email: { type: String, required: true, unique: true, max: 100},
    password: { type: String, max: 255 },
    status: { type: String, required: true, max: 20 },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    token: { type: Schema.Types.ObjectId, ref: 'Token' },
    socials: [{ type: Schema.Types.ObjectId, ref: 'SocialUser' }],
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const UserModel = model<User>('User', schema);
