import Product, { IProduct } from "../models/product.model";
import { startSession } from "mongoose";
import { logger } from "../logger/logger";

export class ProductsDAL {
    
    getAllProducts(): Promise<IProduct[]> {
        return Product.find().then((products: IProduct[]) => {
            return products;
        });
    }

    getProductById(id: string): Promise<IProduct> {
        return Product.findById(id).then((product: IProduct) => {
            return product;
        });
    }

    saveProduct(product: IProduct): Promise<IProduct> {
        return new Product(product).save().then((product: IProduct) => {
            return product;
        });
    }

    updateProduct(product: IProduct): Promise<IProduct> {
        return Product.findByIdAndUpdate(product._id, product).then((product: IProduct) => {
            return product;
        });    
    }

    deleteProduct(id: string): Promise<IProduct> {
        return Product.findByIdAndRemove(id).then((product: IProduct) => {
            return product;
        });
    }

    async saveProducts(products: IProduct[]): Promise<IProduct[]> {
        const session = await startSession();
        session.startTransaction();
        let savedProducts: IProduct[] = [];
        try {
            await Promise.all(products.map(async (product) => {
                await new Product(product).save().then((product: IProduct) => {
                    savedProducts.push(product);
                });
            }));
            await session.commitTransaction();
            session.endSession();
            return Promise.resolve(savedProducts);
        }
        catch(error) {
            logger.error(`error while creatingProducts! aborting transaction!!!. error: `, error);
            await session.abortTransaction();
            session.endSession();
            throw new Error(error);
        }
    }
}