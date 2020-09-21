import { IProduct } from "../models/product.model";
import { productCreateSchema, productUpdateSchema, productDeleteSchema, productsCreateSchema, productGetSchema } from "../schemas/product.schema";
import { logger } from "../logger/logger";
import { findAllProducts, findProductById, saveProduct, findAndUpdateProduct, removeProduct, saveProducts } from '../DAL/products.DAL';

export async function getAllProducts(ctx) {
    logger.info(`got request to get all products`);
    try {
        await findAllProducts().then((products: IProduct[]) => {
            logger.info(`finished request to get all products successfully`);
            ctx.ok(products);
        });
    }
    catch(error) {
        logger.error(`error getting all products. error: `, error);
        ctx.internalServerError();
    }
}

export async function getProductById(ctx) {
    logger.info(`got request to get product with id: ${ctx.params._id}`);

    const productId = productGetSchema.validate({_id: ctx.params._id});

    if(productId.error) {
        ctx.badRequest(productId.error.message);
        logger.warn(`bad input! failed to get product with id ${ctx.params._id}. error: `, productId.error.message);
        return;
    }

    try {
        await findProductById(productId.value).then((product: IProduct) => {
            if(product) {
                logger.info(`finished request to get product with id: ${ctx.params._id} successfully`);
                ctx.ok(product);
                return;
            }
            logger.warn(`failed to get product! product with id: ${ctx.params._id} was not found`);
            ctx.notFound();
        });
    }
    catch(error) {
        logger.error(`error getting product with id: ${ctx.params._id}. error: `, error);
        ctx.internalServerError();
    }
}

export async function createProduct(ctx) {
    logger.info(`got request to create product: ${ctx.request.body}`);
    const product = productCreateSchema.validate(ctx.request.body);

    if(product.error) {
        logger.warn(`bad input! failed to create product: ${ctx.request.body}. error: `, product.error.message);
        ctx.badRequest(product.error.message);
        return;
    }

    try {
        await saveProduct(product.value).then((product: IProduct) => {
            logger.info(`finished request to create product: ${product} successfully`);
            ctx.created(product);
        });
    }
    catch(error) {
        logger.error(`error creating product: ${ctx.request.body}. error: `, error);
        ctx.internalServerError();
    }
}

export async function updateProduct(ctx) {
    logger.info(`got request to update product with id: ${ctx.params._id}`);
    const product = productUpdateSchema.validate({_id: ctx.params._id, ...ctx.request.body});

    if(product.error) {
        logger.warn(`bad input! failed to update product with id: ${ctx.params._id}. error: `, product.error.message);
        ctx.badRequest(product.error.message);
        return;
    }
    try {
        await findAndUpdateProduct(product.value).then((product: IProduct) => {
            if(product) {
                logger.info(`finished request to update product with id: ${ctx.params._id} successfully`);
                ctx.created(product);
                return;
            }
            logger.warn(`failed to update product! product with id: ${ctx.params._id} was not found`);
            ctx.notFound();
        });
    }
    catch(error) {
        logger.error(`error updating product with id: ${ctx.params._id}. error: `, error);
        ctx.internalServerError();
    }
}

export async function deleteProduct(ctx) {
    logger.info(`got request to delete product with id: ${ctx.params._id}`);
    const product = productDeleteSchema.validate(ctx.params);

    if(product.error) {
        logger.warn(`bad input! failed to delete product with id: ${ctx.params._id}. error: `, product.error.message);
        ctx.badRequest(product.error.message);
        return;
    }

    try {
        await removeProduct(product.value).then((product: IProduct) => {
            if(product) {
                logger.info(`finished request to delete product with id: ${ctx.params._id} successfully`);
                ctx.noContent();
                return;
            }
            logger.warn(`failed to delete product! product with id: ${ctx.params._id} was not found`);
            ctx.notFound();
        });
    }
    catch(error) {
        logger.error(`error deleting product with id: ${ctx.params._id}. error: `, error);
        ctx.internalServerError();
    }
}

export async function createProducts(ctx) {
    logger.info(`got request to create products: ${JSON.stringify(ctx.request.body)}`);
    const products = productsCreateSchema.validate(ctx.request.body);

    if(products.error) {
        logger.warn(`bad input! failed to create products: ${ctx.request.body}. error: `, products.error.message);
        ctx.badRequest(products.error.message);
        return;
    }

    try {
        await saveProducts(products.value).then((products: IProduct[]) => {
            logger.info(`finished request to create products: ${products} successfully`);
            ctx.created(products);
        });
    }
    catch(error) {
        logger.error(`error creating products: ${ctx.request.body}. error: `, error);
        ctx.internalServerError();
    }
}


