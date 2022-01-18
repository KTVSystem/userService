import { SocialUserModel } from '../../models/user/social-user-model';

export const findSocialById = async (id: string) => {
    return (await SocialUserModel.find({ id: id }).limit(1))[0];
};

export const removeSocialById = async (id: string) => {
    return SocialUserModel.findOneAndRemove({id: id});
}
