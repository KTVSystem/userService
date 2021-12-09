import mongoose from 'mongoose';
import { mongoUrl }  from './settings';

export const connect = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.NODE_ENV === 'test' ? global.__DB_URL__ : mongoUrl);
    }
};
