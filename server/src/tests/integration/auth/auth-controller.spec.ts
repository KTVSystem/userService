import app from '../../../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../../db');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
const agent = request.agent(app);

import { buildRoleAdmin, buildRoleUser } from '../../helper/user/builders/roleBuilder';
import { buildUserAdmin, buildUserUser } from '../../helper/user/builders/userBuilder';
import { userDtoAdmin, userDtoUser } from '../../helper/user/dtos/userDto';
import { socialUserDto } from '../../helper/user/dtos/socialUserDto';


beforeAll(async () => {
    await db.connect();

    const roleAdmin = await buildRoleAdmin();
    const roleUser = await buildRoleUser();

    await buildUserAdmin(roleAdmin);
    await buildUserUser(roleUser);
});

afterAll(async () => await db.close());

describe('Test auth User', () => {
    it('Signin user', async () => {
        const response = await agent.post('/auth/signin?lang=en').send({
            email: userDtoAdmin.email,
            password: userDtoAdmin.password,
            type: 'Admin'
        });

        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'token')).toBeTruthy();
    });

    it('Signin user permission error', async () => {
        const response = await agent.post('/auth/signin?lang=en').send({
            email: userDtoUser.email,
            password: userDtoUser.password,
            type: 'Admin'
        });

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('User does not have permission level!');
    });

    it('Signin user wrong email', async () => {
        const response = await agent.post('/auth/signin?lang=en').send({
            email: 'wrong' + userDtoUser.email,
            password: userDtoUser.password,
            type: 'Admin'
        });

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('User doesn\'t exist');
    });

    it('Signin user wrong password', async () => {
        const response = await agent.post('/auth/signin?lang=en').send({
            email: userDtoUser.email,
            password: 'wrong' + userDtoUser.password,
            type: 'Admin'
        });

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('Wrong email or password');
    });

    it('Login with social network', async () => {
        const response = await agent.post('/auth/social?lang=en').send({
            socialUser: socialUserDto,
            type: 'Admin'
        });

        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'token')).toBeTruthy();
    });
});
