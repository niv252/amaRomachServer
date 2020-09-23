import { initConfig } from './config/config';
initConfig();

import * as Koa from 'koa';
import * as respond from 'koa-respond';
import * as bodyParser from 'koa-bodyparser';
import * as nconf from 'nconf';
import { productsRouter } from './routers/products.router';
import { logger } from './logger/logger';
import { initDBConnection } from './database/database';
const app = new Koa();

initDBConnection();

app.use(async (ctx, next) => {
    logger.info(`got a ${ctx.method} request with the url: ${ctx.req.url}`);
    try {
        await next();  
        logger.info(`finished a ${ctx.method} request with the url: ${ctx.req.url} successfully`);          
    }
    catch(error) {
        logger.error(`error in ${ctx.method}: ${ctx.req.url}. error: `, error);
        if(ctx.res.statusCode !== 400){
            ctx.internalServerError(error);
        }
    }
});
app.use(bodyParser());
app.use(respond());

app.use(productsRouter.routes()).use(productsRouter.allowedMethods());
const PORT = nconf.get('port') || 9000;
app.listen(PORT, () => {
    logger.info(`Server listening on port: ${PORT}`);
}); 