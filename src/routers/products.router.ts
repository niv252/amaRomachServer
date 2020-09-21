import * as Router from 'koa-router';
import { ProductsDAL } from '../DAL/products.DAL';
import { ProductsController } from '../controllers/products.controller';

export const productsRouter = new Router();
const productsController = new ProductsController(new ProductsDAL());

productsRouter
    .get('/products', async (ctx: any) => {
        await productsController.getAllProducts(ctx);
    })
    .get('/products/:_id', async (ctx: any) => {
        await productsController.getProductById(ctx);
    })
    .post('/products', async (ctx: any) => {
        await productsController.saveProduct(ctx);
    })
    .put('/products/:_id', async (ctx: any) => {
        await productsController.updateProduct(ctx);
    })
    .delete('/products/:_id', async (ctx: any) => {
        await productsController.deleteProduct(ctx);
    })
    .post('/createProducts', async (ctx: any) => {
        await productsController.createProducts(ctx);
    });