const request = require('supertest');
import app from '../../../app';
const db = require('../../db');
const agent = request.agent(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Test auth User', () => {
    const email = "useremail@gmail.com";
    const password = "123456";
    const role = "User";
    const status = "new";

    it('Signin user', async () => {
        // Create seeder;

        const response = await agent.post('/auth/signin').send({
            email: email,
            password: password,
            type: 'Admin'
        });
        console.log(response.res.text);

        expect(response.status).toBe(200);
    });
});
