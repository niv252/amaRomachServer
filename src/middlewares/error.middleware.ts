import { logger } from '../logger/logger';

export const errorMiddleware = async (ctx, next) => {
    try {
        await next();
    }      
    catch(error) {
        logger.error(`error in: ${ctx.method} with the url: ${ctx.req.url}. error: `, error);   
        ctx.status === 404 ? ctx.internalServerError(error) : ctx.send(ctx.status, error);
    }
};