import { TokenModel } from '../../api/models/user/token-model';
import { PermissionModel } from '../../api/models/user/permission-model';
import { RoleModel } from '../../api/models/user/role-model';
import { UserModel } from '../../api/models/user/user-model';
import { Token } from '../../api/interfaces/user/token';
import { Permission } from '../../api/interfaces/user/permission';
import { Role } from '../../api/interfaces/user/role';
import * as PasswordService  from '../../api/services/password-service';
import { Status } from '../../api/interfaces/base/enums/status';
import { SocialUser } from '../../api/interfaces/user/social-user';
import { SocialUserModel } from '../../api/models/user/social-user-model';
import { SocialUserProviders } from '../../api/interfaces/base/enums/social-user-providers';


export const start = async (): Promise<void> => {
    removeStore().then();
    seedData().then();
};

const seedData = async (): Promise<void> => {
    const hash1 = 'sdadiwe9399uadj9jj3d9237nz27n29zn923n9nznz';
    const hash2 = 'sdadiwe9399uadj9jj3d9237nz27n29zn923n9nz99';

    const token1: Token = await TokenModel.create({hash: hash1, status: Status.ACTIVE});
    const token2: Token = await TokenModel.create({hash: hash2, status: Status.ACTIVE});

    const permission1: Permission = await PermissionModel.create({
        name: 'Permission 1',
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });

    const permission2: Permission = await PermissionModel.create({
        name: 'Permission 2',
        status: Status.NEW,
        created: new Date(),
        updated: new Date(),
    });
    const permission3: Permission = await PermissionModel.create({
        name: 'Permission 3',
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });
    const permission4: Permission = await PermissionModel.create({
        name: 'Permission 4',
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });

    const role1: Role = await RoleModel.create({
        name: 'User',
        status: Status.ACTIVE,
        permissions: [permission1, permission2],
        created: new Date(),
        updated: new Date(),
    });
    const role2: Role = await RoleModel.create({
        name: 'Moderator',
        status: Status.ACTIVE,
        permissions: [permission3, permission4],
        created: new Date(),
        updated: new Date(),
    });
    const role3: Role = await RoleModel.create({
        name: 'Admin',
        status: Status.ACTIVE,
        permissions: [permission1, permission3],
        created: new Date(),
        updated: new Date(),
    });

    const social: SocialUser = await SocialUserModel.create({
        id: '123456778',
        email: 'user199@gmail.com',
        firstName: 'user199',
        lastName: 'user199_last',
        photoUrl: 'url',
        provider: SocialUserProviders.FACEBOOK,
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    });

    const passwordHash = await PasswordService.hashPassword('123');
    await UserModel.create({
        email: 'user1@gmail.com',
        password: passwordHash,
        status: Status.ACTIVE,
        role: role3,
        token: token1,
        socials: [social],
        created: new Date(),
        updated: new Date(),
    });
    await UserModel.create({
        email: 'user2@gmail.com',
        password: passwordHash,
        status: Status.ACTIVE,
        role: role2,
        token: token1,
        created: new Date(),
        updated: new Date(),
    });
    await UserModel.create({
        email: 'user3@gmail.com',
        password: passwordHash,
        status: Status.ACTIVE,
        role: role1,
        token: token2,
        created: new Date(),
        updated: new Date(),
    });
    await UserModel.create({
        email: 'user4@gmail.com',
        password: passwordHash,
        status: Status.NEW,
        role: role1,
        token: token1,
        created: new Date(),
        updated: new Date(),
    });
};

const removeStore = async (): Promise<void> => {
    await TokenModel.remove();
    await PermissionModel.remove();
    await RoleModel.remove();
    await UserModel.remove();
};
