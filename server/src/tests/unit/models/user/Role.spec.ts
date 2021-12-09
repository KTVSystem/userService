import * as mockingoose from 'mockingoose';
import { RoleModel } from '../../../../database/models/user/role-model';


describe('Test mongoose Role model', () => {

    it('Find by Id role', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'permission 1',
            status: 'new',
        };
        mockingoose(RoleModel).toReturn(_doc, 'findOne');
        return RoleModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update role', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'permission 1',
            status: 'new',
        };
        mockingoose(RoleModel).toReturn(_doc, 'update');
        return RoleModel
            .update({ name: 'permission 2' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect role name', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            name: 'permission 1',
            status: 'new',
        };
        mockingoose(RoleModel).toReturn(_doc, 'findOne');
        return RoleModel.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.hash = "Another";
            expect(doc.hash).not.toBe(_doc.name);
        });
    });

});
