import express from 'express';
import * as RoleController from '../../controllers/user/role-controllers';
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
        const role = await RoleController.getPermission(req.params.id);
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
        res.status(201).json({
            role,
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
        const role = await RoleController.editRole(req.params.id, req.body);
        res.status(200).json({
            role,
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
        await RoleController.deleteRole(req.params.id);
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
