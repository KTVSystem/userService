import dotenv from 'dotenv';

dotenv.config();

export const port =  process.env.PORT;
export const host =  process.env.HOST;
export const mongoUrl =  process.env.MONGO_URL;
export const saltRound = process.env.SALT_ROUND;
export const secret = process.env.SECRET;
