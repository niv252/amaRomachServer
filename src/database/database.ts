import * as mongoose from 'mongoose';
import * as nconf from 'nconf';
import { logger } from '../logger/logger';

export const initDBConnection = () => {
    connectDB();
    mongoose.connection.on('disconnected', () => {
        logger.error(`db disconnected`);
        setTimeout(() => connectDB() , 500);
    });
    mongoose.connection.on('reconnected', () => {
        logger.info(`db reconnnected!`);
    });
    mongoose.connection.on('connected', () => {
        logger.info(`db connected`);
    });
}

const connectDB = () => {
    const mongoConfig = nconf.get("db");
    mongoose.connect(mongoConfig.uri, mongoConfig.options).catch(err => {
        logger.error(`error while connecting to db. error: `, err);
        setTimeout(() => connectDB() , 500);
   });
}