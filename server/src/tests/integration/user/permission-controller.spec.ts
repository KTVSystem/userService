import app from '../../../app';
const db = require('../../db');
const request = require('supertest');
const agent = request.agent(app);

import { buildRoleUser } from '../../helper/user/builders/roleBuilder';
import { buildUserUser } from '../../helper/user/builders/userBuilder';
import { getToken } from '../../helper/user/auth/token';
import {buildPermission} from "../../helper/user/builders/permissionBuilder";
import {permissionDto} from "../../helper/user/dtos/permissionDto";


beforeAll(async () => {
    await db.connect();
});

beforeEach(async () => {
    await db.clear();
})

afterAll(async () => {
    await db.close()
});

describe('Test Permission Controller', () => {
    it('Get permissions', async () => {
        await buildPermission();
        const token = await getToken();
        const response = await agent.get('/permissions')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('permissions')).toBeTruthy();
        expect(JSON.parse(response.res.text).hasOwnProperty('count')).toBeTruthy();
        expect(JSON.parse(response.res.text).permissions.length > 0).toBeTruthy();
    });

    it('Get permissions all', async () => {
        await buildPermission();
        const token = await getToken();
        const response = await agent.get('/permissions/all')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('permissions')).toBeTruthy();
        expect(JSON.parse(response.res.text).permissions.length > 0).toBeTruthy();
    });

    it('Get permission by id', async () => {
        const permission = await buildPermission();
        const token = await getToken();
        const response = await agent.get('/permissions/' + permission._id)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('permission')).toBeTruthy();
        expect(String(JSON.parse(response.res.text).permission._id)).toEqual(String(permission._id));
    });

    it('Get permission by id, permission doesn\'t exist', async () => {
        const permission = await buildPermission();
        const mistakeUserId = String(permission._id).slice(0, -1) + '1';
        const token = await getToken();
        const response = await agent.get('/permissions/' + mistakeUserId)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('Permission doesn\'t exist');
    });

    it('Create permission', async () => {
        const token = await getToken();
        const response = await agent.post('/permissions')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: permissionDto.name,
                status: permissionDto.status,
            });

        expect(response.status).toBe(201);
        expect(JSON.parse(response.res.text).hasOwnProperty('permission')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Created successful');
        expect(JSON.parse(response.res.text).permission.name).toBe(permissionDto.name);
    });

    it('Edit permission', async () => {
        const permission = await buildPermission();
        const token = await getToken();
        const response = await agent.put('/permissions/' + permission._id)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: permissionDto.name + 'edited',
                status: permissionDto.status,
            });

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('permission')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Updated successful');
        expect(JSON.parse(response.res.text).permission.name).toBe(permissionDto.name + 'edited');
    });

    it('Delete permission', async () => {
        const permission = await buildPermission();
        const token = await getToken();
        const response = await agent.delete('/permissions/' + permission._id)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).message).toBe('Deleted successful');
    });
});
