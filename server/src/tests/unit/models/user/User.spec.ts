import * as mockingoose from 'mockingoose';
import { UserModel } from '../../../../api/models/user/user-model';


describe('Test mongoose User model', () => {

    it('Find by Id user', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
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

    it('Incorrect email', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
            password: '123'
        };
        mockingoose(UserModel).toReturn(_doc, 'findOne');
        return UserModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.email = 'Another';
            expect(doc.email).not.toBe(_doc.email);
        });
    });

});

