import app from '../../../app';
const db = require('../../db');
const request = require('supertest');
const agent = request.agent(app);

import { buildRoleUser } from '../../helper/user/builders/roleBuilder';
import { buildUserUser } from '../../helper/user/builders/userBuilder';
import { userDtoUser } from '../../helper/user/dtos/userDto';
import { getToken } from '../../helper/user/auth/token';
import * as PasswordService from '../../../api/services/password-service';


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

    it('Create user', async () => {
        await buildRoleUser();
        const token = await getToken();
        const response = await agent.post('/users')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: userDtoUser.email,
                password: userDtoUser.password,
                role: userDtoUser.role,
                status: userDtoUser.status
            });

        expect(response.status).toBe(201);
        expect(JSON.parse(response.res.text).hasOwnProperty('user')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Created successful');
        expect(JSON.parse(response.res.text).user.email).toBe(userDtoUser.email);
    });

    it('Edit user', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const response = await agent.put('/users/' + user._id)
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'edited' + userDtoUser.email,
                password: userDtoUser.password,
                role: userDtoUser.role,
                status: userDtoUser.status
            });

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('user')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Updated successful');
        expect(JSON.parse(response.res.text).user.email).toBe('edited' + userDtoUser.email);
    });

    it('Change user password', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const newPassword = userDtoUser.password + 'new';
        const response = await agent.put('/users/' + user._id + '/change-password')
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: newPassword,
            });

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('user')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Password changed successful');
        expect(await PasswordService.comparePassword(newPassword, JSON.parse(response.res.text).user.password))
            .toBeTruthy();
    });

    it('Delete user', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const response = await agent.delete('/users/' + user._id)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).message).toBe('Deleted successful');
    });
});
