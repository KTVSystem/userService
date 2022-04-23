import express from 'express';
import * as RoleController from '../../controllers/user/role-controllers';
import { translate } from '../../services/translate/translateService';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const roles = await RoleController.getRoles();
        res.status(200).json({
            roles,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const role = await RoleController.getPermission(req.params.id, String(req.query.lang));
        res.status(200).json({
            role
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const role = await RoleController.createRole(req.body);
        const message = await translate(String(req.query.lang), 'createdSuccess');
        res.status(201).json({
            role,
            message,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const role = await RoleController.editRole(req.params.id, req.body, String(req.query.lang));
        const message = await translate(String(req.query.lang), 'updatedSuccess');
        res.status(200).json({
            role,
            message,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await RoleController.deleteRole(req.params.id);
        const message = await translate(String(req.query.lang), 'deletedSuccess');
        res.status(200).json({
            message,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default router;
