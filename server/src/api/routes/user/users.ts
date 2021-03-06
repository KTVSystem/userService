import express from 'express';
import * as UserController from '../../controllers/user/user-controller';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserController.getUsers();
        res.status(200).json({
            users
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await UserController.getUser(req.params.id);
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get('/:id/unbind-social/:social', async (req, res) => {
    try {
        const status = await UserController.unbindSocial(req.params.id, req.params.social);
        res.status(200).json({
            status
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await UserController.createUser(req.body);
        res.status(201).json({
            user,
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
        const user = await UserController.editUser(req.params.id, req.body);
        res.status(200).json({
            user,
            status: 'ok'
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.put('/:id/change-password', async (req, res) => {
    try {
        const user = await UserController.changePassword(req.params.id, req.body);
        res.status(200).json({
            user,
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
        await UserController.deleteUser(req.params.id);
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
