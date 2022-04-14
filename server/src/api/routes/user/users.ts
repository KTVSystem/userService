import express from 'express';
import * as UserController from '../../controllers/user/user-controller';
import { translate } from '../../services/translate/translateService';
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
        const user = await UserController.getUser(req.params.id, String(req.query.lang));
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
        const message = await UserController.unbindSocial(req.params.id, req.params.social, String(req.query.lang));
        res.status(200).json({
            message,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await UserController.createUser(req.body, String(req.query.lang));
        const message = await translate(String(req.query.lang), 'createdSuccess');
        res.status(201).json({
            user,
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
        const user = await UserController.editUser(req.params.id, req.body, String(req.query.lang));
        const message = await translate(String(req.query.lang), 'updatedSuccess');
        res.status(200).json({
            user,
            message,
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
        const message = await translate(String(req.query.lang), 'passwordChangedSuccess');
        res.status(200).json({
            user,
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
        await UserController.deleteUser(req.params.id);
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
