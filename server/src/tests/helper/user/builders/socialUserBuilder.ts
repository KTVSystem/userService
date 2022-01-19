import { socialUserDto } from '../dtos/socialUserDto';
import { Status } from '../../../../api/interfaces/base/enums/status';
import { SocialUserModel } from '../../../../api/models/user/social-user-model';
import { SocialUserProviders } from '../../../../api/interfaces/base/enums/social-user-providers';

export const buildSocialUser = async () => {
    return await SocialUserModel.create({
        id: socialUserDto.id,
        email: socialUserDto.email,
        firstName: socialUserDto.firstName,
        lastName: socialUserDto.lastName,
        photoUrl: socialUserDto.photoUrl,
        provider: SocialUserProviders.FACEBOOK,
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
};

export const buildSocialUserSecond = async () => {
    return await SocialUserModel.create({
        id: socialUserDto.id + 'second',
        email: 'second' + socialUserDto.email,
        firstName: socialUserDto.firstName + 'second',
        lastName: socialUserDto.lastName + 'second',
        photoUrl: socialUserDto.photoUrl + 'second',
        provider: SocialUserProviders.GOOGLE,
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
}
