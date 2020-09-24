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
    await validate(ctx, next, productSchema, ctx.request.body);

};

export const validateProductId = async (ctx, next) => {
    await validate(ctx, next, productIdSchema, ctx.params._id);
}

export const validateProducts = async (ctx, next) => {
    await validate(ctx, next, productsSchema, ctx.request.body);
};

const validate = async (ctx, next, schema, data) => {
    let validated = schema.validate(data);
    if(validated.error) {
        ctx.badRequest(validated.error.message);
        throw new Error(validated.error);
    }
    
    await next();
}