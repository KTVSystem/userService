import express from 'express';
import * as UserController from '../../controllers/user/user-controller';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserController.getUsers(req.query);
        const userCount = await UserController.getUsersCount(req.query);
        res.status(200).json({
            users: users,
            count: userCount
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await UserController.getUser(req.params.id);
        res.status(200).json({
            user: user
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await UserController.createUser(req.body);
        res.status(200).json({
            user: user,
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
        const user = await UserController.editUser(req.params.id, req.body);
        res.status(200).json({
            user: user,
            message: 'Updated successful',
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.put('/:id/change-password', async (req, res) => {
    try {
        const user = await UserController.changePassword(req.params.id, req.body);
        res.status(200).json({
            user: user,
            message: 'Password changed successful',
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await UserController.deleteUser(req.params.id);
        res.status(200).json({
            user: user,
            message: 'Deleted successful',
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default router;
