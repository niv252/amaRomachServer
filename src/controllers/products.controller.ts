import { logger } from "../logger/logger";
import { findAllProducts, findProductById, saveProduct, findAndUpdateProduct, removeProduct, saveProducts } from '../DAL/products.DAL';

export const getAllProducts = async (ctx, next) => {
    const products = await findAllProducts();
    ctx.ok(products);
    await next();
}

export const getProductById = async (ctx, next) => {
    const product = await findProductById(ctx.params._id);

    if(product) {
        ctx.ok(product);
    } else {
        logger.warn(`failed to get product! product with id: ${ctx.params._id} was not found`);
        ctx.notFound();
    }
    
    await next();
}

export const createProduct = async (ctx, next) => {
    const product = await saveProduct(ctx.request.body);
    ctx.created(product);
    await next();
}

export const updateProduct = async (ctx, next) => {
    const product = await findAndUpdateProduct({_id: ctx.params._id, ...ctx.request.body});

    if(product) {
        ctx.created(product);
    } else {
        logger.warn(`failed to update product! product with id: ${ctx.params._id} was not found`);
        ctx.notFound();
    }

    await next();
}

export const deleteProduct = async (ctx, next) => {
    const product = await removeProduct(ctx.params._id);

    if(product) {
        ctx.noContent();
    } else {
        logger.warn(`failed to delete product! product with id: ${ctx.params._id} was not found`);
        ctx.notFound();
    }

    await next();
}

export const createProducts = async (ctx, next) => {
    const products = await saveProducts(ctx.request.body);
    ctx.created(products);
    await next();
}