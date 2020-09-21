import Product, { IProduct } from "../models/product.model";
import { startSession } from "mongoose";
import { logger } from "../logger/logger";

export function findAllProducts(): Promise<IProduct[]> {
    return Product.find().exec();
}

export function findProductById(id: string): Promise<IProduct> {
    return Product.findById(id).exec();
}

export function saveProduct(product: IProduct): Promise<IProduct> {
    return new Product(product).save();
}

export function findAndUpdateProduct(product: IProduct): Promise<IProduct> {
    return Product.findByIdAndUpdate(product._id, product, {new: true}).exec();    
}

export function removeProduct(id: string): Promise<IProduct> {
    return Product.findByIdAndRemove(id).exec();
}

export async function saveProducts(products: IProduct[]): Promise<IProduct[]> {
    const session = await startSession();
    session.startTransaction();
    try {
        let savedProducts = await Promise.all(products.map((product) => 
            new Product(product).save()
        ));
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