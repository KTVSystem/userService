import express from 'express';
import * as AuthController from '../../controllers/auth/auth-controller';
import { User } from '../../../database/interfaces/user/user';
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const user: User = await AuthController.signup(req.body.email, req.body.nickname, req.body.password);
        res.status(201).json({
            token: user.token.hash,
            id: user._id
        });
    } catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await AuthController.loginUser(req.body.nickname, req.body.password);
        res.status(200).json({
            token: user.token.hash
        });
    } catch(error) {
        res.status(400).json({
            message: error.message,
            errors: error.errors
        });
    }
});

export default router;
