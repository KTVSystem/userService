import * as mockingoose from 'mockingoose';
import { PermissionModel } from '../../../../database/models/user/permission-model';


describe('Test mongoose Permission model', () => {

    it('Find by Id permission', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'permission 1',
            status: 'new',
        };
        mockingoose(PermissionModel).toReturn(_doc, 'findOne');
        return PermissionModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update permission', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'permission 1',
            status: 'new',
        };
        mockingoose(PermissionModel).toReturn(_doc, 'update');
        return PermissionModel
            .update({ name: 'permission 2' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect permission name', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'permission 1',
            status: 'new',
        };
        mockingoose(PermissionModel).toReturn(_doc, 'findOne');
        return PermissionModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.hash = "Another";
            expect(doc.hash).not.toBe(_doc.name);
        });
    });

});
