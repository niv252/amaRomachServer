import * as Router from 'koa-router';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, createProducts } from '../controllers/products.controller';

export const productsRouter = new Router();

productsRouter
    .get('/products', getAllProducts)
    .get('/products/:_id', getProductById)
    .post('/products', createProduct)
    .put('/products/:_id', updateProduct)
    .delete('/products/:_id', deleteProduct)
    .post('/createProducts', createProducts);