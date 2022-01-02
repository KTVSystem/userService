import app from '../../../app';
const db = require('../../db');
const request = require('supertest');
const agent = request.agent(app);

import {buildRoleAdmin, buildRoleUser} from '../../helper/user/builders/roleBuilder';
import {buildUserAdmin, buildUserUser} from '../../helper/user/builders/userBuilder';
import { userDtoAdmin, userDtoUser } from '../../helper/user/dtos/userDto';
import { getToken } from '../../helper/user/auth/token';


beforeAll(async () => {
    await db.connect();
});

beforeEach(async () => {
    await db.clear();
})

afterAll(async () => {
    await db.close()
});

describe('Test User Controller', () => {
    it('Get users', async () => {
        const token = await getToken();
        const response = await agent.get('/users')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('users')).toBeTruthy();
        expect(JSON.parse(response.res.text).users.length > 0).toBeTruthy();
    });

    it('Get user by id', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const response = await agent.get('/users/' + user._id)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('user')).toBeTruthy();
        expect(String(JSON.parse(response.res.text).user._id)).toEqual(String(user._id));
    });

    it('Get user by id, user doesn\'t exist', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const mistakeUserId = String(user._id).slice(0, -1) + '1';
        const token = await getToken();
        const response = await agent.get('/users/' + mistakeUserId)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('User doesn\'t exist');
    });

    it('create user', async () => {
        const token = await getToken();
        const response = await agent.get('/users')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('users')).toBeTruthy();
        expect(JSON.parse(response.res.text).users.length > 0).toBeTruthy();
    });
});
