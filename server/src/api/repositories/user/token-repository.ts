import { TokenModel } from '../../models/user/token-model';

export const removeTokenEntry = async (id: string) => {
    await TokenModel.findByIdAndRemove(id);
}
