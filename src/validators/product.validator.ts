const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const productSchema = Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    description: Joi.string()
        .min(3)
        .max(200)
        .required(),

    price: Joi.number()
        .integer()
        .min(0)
        .required(),

    image: Joi.string()
        .required(),

    limit: Joi.number()
        .integer()
        .min(0)
});

const productIdSchema = Joi.objectId().required();

const productsSchema = Joi.array().items(productSchema).min(1);

export const validateProduct = async (ctx, next) => {
    let validatedProduct = productSchema.validate(ctx.request.body);
    if(validatedProduct.error) {
        ctx.badRequest(validatedProduct.error.message);
        throw new Error(validatedProduct.error);
    }
    await next();
};

export const validateProductId = async (ctx, next) => {
    let validatedProductId = productIdSchema.validate(ctx.params._id);
    if(validatedProductId.error) {
        ctx.badRequest(validatedProductId.error.message);
        throw new Error(validatedProductId.error);
    }
    await next();
}

export const validateProducts = async (ctx, next) => {
    let validatedProducts = productsSchema.validate(ctx.request.body);
    if(validatedProducts.error) {
        ctx.badRequest(validatedProducts.error.message);
        throw new Error(validatedProducts.error);
    }
    await next();
}; 