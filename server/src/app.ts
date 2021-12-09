import express from 'express';
import bodyParser from 'body-parser';
import auth from './api/routes/auth/auth';
import seed from './api/routes/system/seed';
const app = express();

// Parse body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Parse body

// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept, Authorization");
    next();
});
// Cors

app.get('/', (req, res) => {
    res.send('User Service works !!!');
});

app.use('/auth', auth);
app.use('/seed', seed);

export default app;
