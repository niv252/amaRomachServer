import { logger } from "../logger/logger";
import { findAllProducts, findProductById, saveProduct, findAndUpdateProduct, removeProduct, saveProducts } from '../DAL/products.DAL';

export const getAllProducts = async (ctx) => {
    const products = await findAllProducts();
    ctx.ok(products);
}

export const getProductById = async (ctx) => {
    const product = await findProductById(ctx.params._id);

    if(product) {
        ctx.ok(product);
        return;
    }
    logger.warn(`failed to get product! product with id: ${ctx.params._id} was not found`);
    ctx.notFound();
}

export const createProduct = async (ctx) => {
    const product = await saveProduct(ctx.request.body);
    ctx.created(product);
}

export const updateProduct = async (ctx) => {
    const product = await findAndUpdateProduct({_id: ctx.params._id, ...ctx.request.body});
    if(product) {
        ctx.created(product);
        return;
    }
    logger.warn(`failed to update product! product with id: ${ctx.params._id} was not found`);
    ctx.notFound();
}

export const deleteProduct = async (ctx) => {
    const product = await removeProduct(ctx.params._id);
    if(product) {
        ctx.noContent();
        return;
    }
    logger.warn(`failed to delete product! product with id: ${ctx.params._id} was not found`);
    ctx.notFound();
}

export const createProducts = async (ctx) => {
    const products = await saveProducts(ctx.request.body);
    ctx.created(products);
}