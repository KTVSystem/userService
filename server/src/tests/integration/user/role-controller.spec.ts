import app from '../../../app';
const db = require('../../db');
const request = require('supertest');
const agent = request.agent(app);

import { buildRoleUser } from '../../helper/user/builders/roleBuilder';
import { buildUserUser } from '../../helper/user/builders/userBuilder';
import { getToken } from '../../helper/user/auth/token';
import {buildPermission} from "../../helper/user/builders/permissionBuilder";
import {permissionDto} from "../../helper/user/dtos/permissionDto";
import {roleUserDto} from "../../helper/user/dtos/roleDto";


beforeAll(async () => {
    await db.connect();
});

beforeEach(async () => {
    await db.clear();
})

afterAll(async () => {
    await db.close()
});

describe('Test Role Controller', () => {
    it('Get roles', async () => {
        await buildRoleUser();
        const token = await getToken();
        const response = await agent.get('/roles')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('roles')).toBeTruthy();
        expect(JSON.parse(response.res.text).hasOwnProperty('count')).toBeTruthy();
        expect(JSON.parse(response.res.text).roles.length > 0).toBeTruthy();
    });

    it('Get role by id', async () => {
        const role = await buildRoleUser();
        const token = await getToken();
        const response = await agent.get('/roles/' + role._id)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('role')).toBeTruthy();
        expect(String(JSON.parse(response.res.text).role._id)).toEqual(String(role._id));
    });

    it('Get role by id, role doesn\'t exist', async () => {
        const role = await buildRoleUser();
        const mistakeRoleId = String(role._id).slice(0, -1) + '1';
        const token = await getToken();
        const response = await agent.get('/roles/' + mistakeRoleId)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(400);
        expect(JSON.parse(response.res.text).error).toEqual('Role doesn\'t exist');
    });

    it('Create role', async () => {
        const token = await getToken();
        const response = await agent.post('/roles')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: roleUserDto.name,
                status: roleUserDto.status,
                permissions: []
            });

        expect(response.status).toBe(201);
        expect(JSON.parse(response.res.text).hasOwnProperty('role')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Created successful');
        expect(JSON.parse(response.res.text).role.name).toBe(roleUserDto.name);
    });

    it('Edit role', async () => {
        const role = await buildRoleUser();
        const token = await getToken();
        const response = await agent.put('/roles/' + role._id)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: roleUserDto.name + 'edited',
                status: roleUserDto.status,
                permissions: []
            });

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).hasOwnProperty('role')).toBeTruthy();
        expect(JSON.parse(response.res.text).message).toBe('Updated successful');
        expect(JSON.parse(response.res.text).role.name).toBe(roleUserDto.name + 'edited');
    });

    it('Delete role', async () => {
        const role = await buildRoleUser();
        const token = await getToken();
        const response = await agent.delete('/roles/' + role._id)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(200);
        expect(JSON.parse(response.res.text).message).toBe('Deleted successful');
    });
});
