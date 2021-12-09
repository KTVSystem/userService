import { TokenModel } from '../models/user/token-model';
import { PermissionModel } from '../models/user/permission-model';
import { RoleModel } from '../models/user/role-model';
import { UserModel } from '../models/user/user-model';
import { Token } from '../interfaces/user/token';
import { Permission } from '../interfaces/user/permission';
import { Role } from '../interfaces/user/role';
import * as PasswordService  from '../../api/services/password-service';
import { Status } from '../enums/status';


    export const start = async (): Promise<void> => {
        removeStore().then();
        seedData().then();
    }

    const seedData = async (): Promise<void> => {
        const hash = 'sdadiwe9399uadj9jj3d9237nz27n29zn923n9nznz';

        const token1: Token = await TokenModel.create({hash: hash, status: Status.ACTIVE});
        const token2: Token = await TokenModel.create({hash: hash, status: Status.ACTIVE});

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
            name: 'Role 1',
            status: Status.ACTIVE,
            permissions: [permission1, permission2],
            created: new Date(),
            updated: new Date(),
        });
        const role2: Role = await RoleModel.create({
            name: 'Role 2',
            status: Status.ACTIVE,
            permissions: [permission3, permission4],
            created: new Date(),
            updated: new Date(),
        });
        const role3: Role = await RoleModel.create({
            name: 'Role 3',
            status: Status.ACTIVE,
            permissions: [permission1, permission3],
            created: new Date(),
            updated: new Date(),
        });

        const passwordHash = await PasswordService.hashPassword('123');
        await UserModel.create({
            email: 'user1@gmail.com',
            nickname: 'user1',
            password: passwordHash,
            status: Status.NEW,
            role: role1,
            token: token1,
            created: new Date(),
            updated: new Date(),
        });
        await UserModel.create({
            email: 'user2@gmail.com',
            nickname: 'user2',
            password: passwordHash,
            status: Status.ACTIVE,
            role: role2,
            token: token1,
            created: new Date(),
            updated: new Date(),
        });
        await UserModel.create({
            email: 'user3@gmail.com',
            nickname: 'user3',
            password: passwordHash,
            status: Status.ACTIVE,
            role: role3,
            token: token2,
            created: new Date(),
            updated: new Date(),
        });
        await UserModel.create({
            email: 'user4@gmail.com',
            nickname: 'user4',
            password: passwordHash,
            status: Status.ACTIVE,
            role: role1,
            token: token1,
            created: new Date(),
            updated: new Date(),
        });
    }

    const removeStore = async (): Promise<void> => {
        await TokenModel.remove();
        await PermissionModel.remove();
        await RoleModel.remove();
        await UserModel.remove();
    }
