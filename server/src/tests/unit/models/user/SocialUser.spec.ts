import * as mockingoose from 'mockingoose';
import { SocialUserModel} from '../../../../api/models/user/social-user-model';


describe('Test mongoose SocialUser model', () => {

    it('Find by Id social user', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            id: '920302309230',
            email: 'name@email.com',
            firstName: 'firstName',
            lastName: 'lastName',
            photoUrl: 'photoUrl',
            provider: 'facebook',
        };
        mockingoose(SocialUserModel).toReturn(_doc, 'findOne');
        return SocialUserModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update social user', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            id: '920302309230',
            email: 'name@email.com',
            firstName: 'firstName',
            lastName: 'lastName',
            photoUrl: 'photoUrl',
            provider: 'facebook',
        };
        mockingoose(SocialUserModel).toReturn(_doc, 'update');
        return SocialUserModel
            .update({ firstName: 'changed' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect email', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            id: '920302309230',
            email: 'name@email.com',
            firstName: 'firstName',
            lastName: 'lastName',
            photoUrl: 'photoUrl',
            provider: 'facebook',
        };
        mockingoose(SocialUserModel).toReturn(_doc, 'findOne');
        return SocialUserModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.email = 'Another';
            expect(doc.email).not.toBe(_doc.email);
        });
    });

});

