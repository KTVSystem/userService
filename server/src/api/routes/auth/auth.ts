import express from 'express';
import * as AuthController from '../../controllers/auth/auth-controller';
import {AuthTypes} from '../../interfaces/base/enums/auth-types';
const router = express.Router();

router.post('/signin', async (req, res) => {
    try {
        const user = await AuthController.loginUser(req.body.email, req.body.password, req.body.type);
        res.status(200).json({
            token: user.token.hash
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/social', async (req, res) => {
    try {
        const user = await AuthController.loginSocialUser(req.body.socialUser, req.body.type);
        res.status(200).json({
            token: user.token.hash
        });
    } catch(error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

export default router;
