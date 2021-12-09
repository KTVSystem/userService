import { Schema, model } from 'mongoose';
import { User } from '../../interfaces/user/user';

const schema = new Schema<User>({
    email: { type: String, required: true, unique: true, max: 100},
    nickname: { type: String, required: true, unique: true, max: 50},
    status: { type: String, required: true, max: 20 },
    password: { type: String, required: true, max: 255 },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    token: { type: Schema.Types.ObjectId, ref: 'Token' },
    created: { type: Date, required: false},
    updated: { type: Date, required: false}
}, {
    versionKey: false
});

export const UserModel = model<User>('User', schema);

export const findByNickname = async (nickname: string) => {
    const user = (await UserModel.find({ nickname: nickname }).limit(1))[0];
    if (typeof user !== 'undefined') {
        return user;
    }
    throw new Error('User doesn\'t exist');
}


