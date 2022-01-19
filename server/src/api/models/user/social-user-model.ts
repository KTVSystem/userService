import { Schema, model } from 'mongoose';
import { SocialUser } from '../../interfaces/user/social-user';

const schema = new Schema<SocialUser>({
    id: { type: String, required: true, max: 50},
    email: { type: String, required: true, max: 100},
    firstName: { type: String, required: true, max: 50},
    lastName: { type: String, required: true, max: 50},
    photoUrl: { type: String, required: true, max: 100},
    provider: { type: String, required: true, max: 100},
    status: { type: String, required: true, max: 20 },
    created: { type: Date, required: false},
    updated: { type: Date, required: false},
}, {
    versionKey: false
});

export const SocialUserModel = model<SocialUser>('SocialUser', schema);
