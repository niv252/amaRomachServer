import * as Router from 'koa-router';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, createProducts } from '../controllers/products.controller';
import { validateProduct, validateProductId, validateProducts } from '../validators/product.validator';

export const productsRouter = new Router();

productsRouter
    .get('/products', getAllProducts)
    .get('/products/:_id', validateProductId, getProductById)
    .post('/products', validateProduct, createProduct)
    .put('/products/:_id', validateProductId, validateProduct, updateProduct)
    .delete('/products/:_id', validateProductId, deleteProduct)
    .post('/createProducts', validateProducts, createProducts);