import { logger } from '../logger/logger';

export const loggerMiddleware = async (ctx, next) => {
    logger.info(`got a ${ctx.method} request with the url: ${ctx.req.url} with the params: ${ctx.params} and the body: ${JSON.stringify(ctx.request.body)}`);
    await next();  
    logger.info(`finished a ${ctx.method} request with the url: ${ctx.req.url} with the status code ${ctx.res.statusCode} and with the body: ${JSON.stringify(ctx.response.body)}`);          
}