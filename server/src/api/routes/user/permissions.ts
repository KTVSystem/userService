import express from 'express';
import * as PermissionController from '../../controllers/user/permission-controller';
import { translate } from '../../services/translate/translateService';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const permissions = await PermissionController.getPermissions();
        res.status(200).json({
            permissions
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const permission = await PermissionController.getPermission(req.params.id, String(req.query.lang));
        res.status(200).json({
            permission
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const permission = await PermissionController.createPermission(req.body);
        const message = await translate(String(req.query.lang), 'createdSuccess');
        res.status(201).json({
            permission,
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
        const permission = await PermissionController.editPermission(req.params.id, req.body, String(req.query.lang));
        const message = await translate(String(req.query.lang), 'updatedSuccess');
        res.status(200).json({
            permission,
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
        await PermissionController.deletePermission(req.params.id);
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
