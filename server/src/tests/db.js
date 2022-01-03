const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connect = async () => {
    await mongoose.disconnect();

    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, err => {
        if (err) {
            console.error(err);
        }
    });
};

const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};

const clear = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }
};

module.exports = {
    connect,
    close,
    clear,
};
