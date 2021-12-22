import { createToken, decodeToken } from '../../../../api/services/auth/jwt-service';
import { User } from '../../../../api/interfaces/user/user';
import { Status } from '../../../../api/interfaces/base/enums/status';
import { Role } from '../../../../api/interfaces/user/role';

describe('Test JWT service', () => {
    const role: Role = {
        name: 'Role 99',
        status: Status.ACTIVE,
        created: new Date(),
        updated: new Date(),
    };
    const user: User = {
        _id: 'test_string',
        email: 'test@gmail.com',
        status: Status.ACTIVE,
        role: role,
        created: new Date(),
        updated: new Date(),
    };
    test('Create & Decode success', async () => {
        const token = await createToken(user);
        const decodedToken = await decodeToken(token);
        expect(decodedToken.email).toBe(user.email);
        expect(decodedToken.role).toBe(user.role.name);
    });
    test('Create & Decode error', async () => {
        const token = await createToken(user);
        const decodedToken = await decodeToken(token);
        expect(decodedToken.email).not.toBe('test_error@gmail.com');
    });
});
