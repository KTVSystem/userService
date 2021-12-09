import http from "http";
import app from "./app";
import { port }  from './config/settings';
import { connect } from './config/dbConnect';

const server = http.createServer(app);

server.listen(port, () => {
    connect()
        .then(() => {
            console.log("MongoDb connected");
        })
        .catch(err => console.log(err));
});
