import * as mockingoose from 'mockingoose';
import { UserModel } from '../../../../database/models/user/user-model';


describe('Test mongoose User model', () => {

    it('Find by Id user', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
            nickname: 'name-nik',
            password: '123'
        };
        mockingoose(UserModel).toReturn(_doc, 'findOne');
        return UserModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update user', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
            nickname: 'name-nik',
            password: '123'
        };
        mockingoose(UserModel).toReturn(_doc, 'update');
        return UserModel
            .update({ name: 'changed' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect user name', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
            nickname: 'name-nik',
            password: '123'
        };
        mockingoose(UserModel).toReturn(_doc, 'findOne');
        return UserModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.nickname = "Another";
            expect(doc.nickname).not.toBe(_doc.nickname);
        });
    });

});

