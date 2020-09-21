import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as respond from 'koa-respond';
import * as bodyParser from 'koa-bodyparser';
import * as nconf from 'nconf';
import { productsRouter } from '../routers/products.router';
import { initLogger, logger } from '../logger/logger';

export class AmaRomachServer {
    start() {
        const app = new Koa();
        initLogger();
        this.initConfig();
        this.initDBConnection();

        app.use(bodyParser());
        app.use(respond());

        app.use(productsRouter.routes()).use(productsRouter.allowedMethods());

        const PORT = nconf.get('port') || 9000;
        app.listen(PORT, () => {
            logger.info(`Server listening on port: ${PORT}`);
          });
          
    }

    private initConfig() {
        nconf.add('config', { type: 'file', file: './dist/configuration/config.json' });
    }

    private initDBConnection() {
        this.connectDB();
        mongoose.connection.on('disconnected', () => {
            logger.error(`db disconnected`);
            setTimeout(() => this.connectDB() , 500);
        });
    }

    private connectDB() {
        const mongoConfig = nconf.get("db");
        mongoose.connect(mongoConfig.uri, mongoConfig.options).then(() => logger.info(`connected to db!`)).catch(err => {
            logger.error(`error while connecting to db. error: `, err);
            setTimeout(() => this.connectDB() , 500);
       });
    }
}