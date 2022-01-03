import express from 'express';
import * as RoleController from '../../controllers/user/role-controllers';
import {deleteRole, editRole} from "../../controllers/user/role-controllers";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const roles = await RoleController.getRoles(req.query);
        const roleCount = await RoleController.getRoleCount(req.query);
        res.status(200).json({
            roles: roles,
            count: roleCount
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const role = await RoleController.getPermission(req.params.id);
        res.status(200).json({
            role: role
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const role = await RoleController.createRole(req.body);
        res.status(201).json({
            role: role,
            message: 'Created successful',
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const role = await RoleController.editRole(req.params.id, req.body);
        res.status(200).json({
            role: role,
            message: 'Updated successful',
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const role = await RoleController.deleteRole(req.params.id);
        res.status(200).json({
            role: role,
            message: 'Deleted successful',
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default router;
