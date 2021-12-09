import * as mockingoose from 'mockingoose';
import { TokenModel } from '../../../../database/models/user/token-model';


describe('Test mongoose Token model', () => {

    it('Find by Id token', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            hash: '1208c3nc2303ncn0c01020c20n10c2182n',
        };
        mockingoose(TokenModel).toReturn(_doc, 'findOne');
        return TokenModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update token', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            hash: '1208c3nc2303ncn0c01020c20n10c2182n',
        };
        mockingoose(TokenModel).toReturn(_doc, 'update');
        return TokenModel
            .update({ hash: 'changed' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect token hash', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            hash: '1208c3nc2303ncn0c01020c20n10c2182n',
        };
        mockingoose(TokenModel).toReturn(_doc, 'findOne');
        return TokenModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.hash = "Another";
            expect(doc.hash).not.toBe(_doc.hash);
        });
    });

});
