import { Schema, model } from 'mongoose';
import { Token } from '../../interfaces/user/token';

const schema = new Schema<Token>({
    hash: { type: String, required: true, max: 255},
    status: { type: String, required: true, max: 20 },
    expired: { type: Date, required: false },
}, {
    versionKey: false
});

export const TokenModel = model<Token>('Token', schema);

export const removeTokenEntry = async (id: string) => {
    await TokenModel.findByIdAndRemove(id);
}
