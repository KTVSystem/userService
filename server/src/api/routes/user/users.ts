import express from 'express';
import * as UserController from '../../controllers/user/user-controller';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await UserController.getUsers();
        res.status(200).json({
            users: users
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

export default router;
