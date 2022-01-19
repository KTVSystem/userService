import express from 'express';
import bodyParser from 'body-parser';
import auth from './api/routes/auth/auth';
import users from './api/routes/user/users';
import permissions from './api/routes/user/permissions';
import roles from './api/routes/user/roles';
import seed from './api/routes/system/seed';
import { authUrlLst } from './api/interfaces/base/lists/auth-url-list';
import * as AuthController from './api/controllers/auth/auth-controller';
const app = express();

// Parse body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Parse body

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, x-requested-with, Content-Type, Accept, Authorization');
    next();
});
// Cors

// Auth Middleware
app.use(async (req, res, next) => {
    const url = req.url;
    for (const authUrl of authUrlLst) {
        if (url.indexOf(authUrl) !== -1 && String(req.method) !== 'OPTIONS') {
            const token = String(req.header('authorization')).substring(7);
            const result = await AuthController.checkToken(token);
            if (!result) {
                res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        }
    }
    next();
});
// Auth Middleware

app.get('/', (req, res) => {
    res.send('User Service works !!!');
});

app.use('/auth', auth);
app.use('/users', users);
app.use('/permissions', permissions);
app.use('/roles', roles);
app.use('/seed', seed);

export default app;
