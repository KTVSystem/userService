import app from '../../../app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('../../db');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('supertest');
const agent = request.agent(app);

import { buildRoleUser } from '../../helper/user/builders/roleBuilder';
import { buildUserUser } from '../../helper/user/builders/userBuilder';
import { buildSocialUser, buildSocialUserSecond } from '../../helper/user/builders/socialUserBuilder';
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
        const response = await agent.get('/users?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'users')).toBeTruthy();
        expect(JSON.parse(response.res.text).users.length > 0).toBeTruthy();
    });

    it('Get user by id', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const response = await agent.get('/users/' + user._id + '?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'user')).toBeTruthy();
        expect(String(JSON.parse(response.res.text).user._id)).toEqual(String(user._id));
    });

    it('Get user by id, user doesn\'t exist', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const mistakeUserId = String(user._id).slice(0, -1) + '1';
        const token = await getToken();
        const response = await agent.get('/users/' + mistakeUserId + '?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('User doesn\'t exist');
    });

    it('Create user', async () => {
        await buildRoleUser();
        const token = await getToken();
        const response = await agent.post('/users?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: userDtoUser.email,
                password: userDtoUser.password,
                role: userDtoUser.role,
                status: userDtoUser.status
            });

        expect(response.status).toBe(201);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'user')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Created successful');
        expect(JSON.parse(response.res.text).user.email).toBe(userDtoUser.email);
    });

    it('Edit user', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const response = await agent.put('/users/' + user._id + '?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: 'edited' + userDtoUser.email,
                password: userDtoUser.password,
                role: userDtoUser.role,
                status: userDtoUser.status
            });

        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'user')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Updated successful');
        expect(JSON.parse(response.res.text).user.email).toBe('edited' + userDtoUser.email);
    });

    it('Change user password', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const newPassword = userDtoUser.password + 'new';
        const response = await agent.put('/users/' + user._id + '/change-password?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send({
                password: newPassword,
            });

        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'user')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Password changed successful');
        expect(await PasswordService.comparePassword(newPassword, JSON.parse(response.res.text).user.password))
            .toBeTruthy();
    });

    it('Unbind social from user [many]', async () => {
        const roleUser = await buildRoleUser();
        const social = await buildSocialUser();
        const social2 = await buildSocialUserSecond();
        const user = await buildUserUser(roleUser, [social, social2]);
        const token = await getToken();
        const response = await agent.get('/users/' + user._id + '/unbind-social/' + social.id + '?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'message')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Social account was unbinded!');
    });

    it('Unbind social from user [one]', async () => {
        const roleUser = await buildRoleUser();
        const social = await buildSocialUser();
        const user = await buildUserUser(roleUser, [social]);
        const token = await getToken();
        const response = await agent.get('/users/' + user._id + '/unbind-social/' + social.id + '?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send();
        expect(response.status).toBe(200);
        expect(Object.prototype.hasOwnProperty.call(JSON.parse(response.res.text), 'message')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Deleted successful');
    });

    it('Delete user', async () => {
        const roleUser = await buildRoleUser();
        const user = await buildUserUser(roleUser);
        const token = await getToken();
        const response = await agent.delete('/users/' + user._id + '?lang=en')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).message).toBe('Deleted successful');
    });
});
