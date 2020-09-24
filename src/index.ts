import { initConfig } from './config/config';
initConfig();

import * as Koa from 'koa';
import * as respond from 'koa-respond';
import * as bodyParser from 'koa-bodyparser';
import * as nconf from 'nconf';
import { productsRouter } from './routers/products.router';
import { logger } from './logger/logger';
import { initDBConnection } from './database/database';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorMiddleware } from './middlewares/error.middleware';


const app = new Koa();

initDBConnection();

    //change db log - done
    //add parameters to logger - done
    //add middleware file - done
    //seperate to 2 middleware - done
    //await next - done
    //no return; - done
    //koa-respond custom errors - done
    //rename product - done
    //generic validator - done
    
app.use(bodyParser());
app.use(loggerMiddleware);
app.use(errorMiddleware);
app.use(respond());

app.use(productsRouter.routes()).use(productsRouter.allowedMethods());

const PORT = nconf.get('port') || 9000;
app.listen(PORT, () => {
    logger.info(`Server listening on port: ${PORT}`);
}); 