import app from '../../../../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
const agent = request.agent(app);
import { userDtoAdmin } from '../dtos/userDto';
import { buildRoleAdmin } from '../builders/roleBuilder';
import { buildUserAdmin } from '../builders/userBuilder';

export const getToken = async () => {
    const roleAdmin = await buildRoleAdmin();
    await buildUserAdmin(roleAdmin);
    const responseAuth = await agent.post('/auth/signin').send({
        email: userDtoAdmin.email,
        password: userDtoAdmin.password,
        type: 'Admin'
    });
    return JSON.parse(responseAuth.res.text).token;
}
