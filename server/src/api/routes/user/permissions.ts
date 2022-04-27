import express from 'express';
import * as PermissionController from '../../controllers/user/permission-controller';
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
        const permission = await PermissionController.getPermission(req.params.id);
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
        res.status(201).json({
            permission,
            status: 'ok'
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const permission = await PermissionController.editPermission(req.params.id, req.body);
        res.status(200).json({
            permission,
            status: 'ok'
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
        res.status(200).json({
            status: 'ok'
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default router;
