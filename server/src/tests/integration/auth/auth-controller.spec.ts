import app from '../../../app';
const db = require('../../db');
const request = require('supertest');
const agent = request.agent(app);

import { buildRoleAdmin, buildRoleUser } from '../../helper/user/builders/roleBuilder';
import { buildUserAdmin, buildUserUser } from '../../helper/user/builders/userBuilder';
import { userDtoAdmin, userDtoUser } from '../../helper/user/dtos/userDto';


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
        const response = await agent.post('/auth/signin').send({
            email: userDtoAdmin.email,
            password: userDtoAdmin.password,
            type: 'Admin'
        });

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('token')).toBeTruthy();
    });

    it('Signin user permission error', async () => {
        const response = await agent.post('/auth/signin').send({
            email: userDtoUser.email,
            password: userDtoUser.password,
            type: 'Admin'
        });

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('User does not have permission level!');
    });

    it('Signin user wrong email', async () => {
        const response = await agent.post('/auth/signin').send({
            email: 'wrong' + userDtoUser.email,
            password: userDtoUser.password,
            type: 'Admin'
        });

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('User doesn\'t exist');
    });

    it('Signin user wrong password', async () => {
        const response = await agent.post('/auth/signin').send({
            email: userDtoUser.email,
            password: 'wrong' + userDtoUser.password,
            type: 'Admin'
        });

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('Wrong email or password');
    });
});
