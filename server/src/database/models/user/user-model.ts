import { Schema, model } from 'mongoose';
import { User } from '../../interfaces/user/user';

const schema = new Schema<User>({
    email: { type: String, required: true, unique: true, max: 100},
    password: { type: String, required: true, max: 255 },
    status: { type: String, required: true, max: 20 },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    token: { type: Schema.Types.ObjectId, ref: 'Token' },
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const UserModel = model<User>('User', schema);

export const findByEmail = async (email: string) => {
    const user = (await UserModel.find({ email: email }).populate('role').limit(1))[0];
    if (typeof user !== 'undefined') {
        return user;
    }
    throw new Error('User doesn\'t exist');
}

export const all = async () => {
    return UserModel.find({}).populate('role').populate('token') as User[];
}

export const findById = async (id: string) => {
    const user = (await UserModel.find({ _id: id }).populate('role').populate('token').limit(1))[0];
    if (typeof user !== 'undefined') {
        return user;
    }
    throw new Error('User doesn\'t exist');
}


