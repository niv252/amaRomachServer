const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//Joi keys or extend json? i did with extended json and i think its elegant. hope its ok :)
const productBaseSchema = {
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
}

const productIdSchema = {
    _id: Joi.objectId()
    .required()
}

export const productCreateSchema = Joi.object({
   ...productBaseSchema
});

export const productUpdateSchema = Joi.object({
    ...productBaseSchema,
    ...productIdSchema
});

export const productDeleteSchema = Joi.object({
    ...productIdSchema
});

export const productsCreateSchema = Joi.array().items(Joi.object({
    ...productBaseSchema
})).min(1);

export const productGetSchema = Joi.object({
    ...productIdSchema
});