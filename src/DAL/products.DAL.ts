import { Product } from "../models/product.model";
import { ProductModel } from "../schemas/product.schema";
import { startSession } from "mongoose";
import { logger } from "../logger/logger";

export const findAllProducts = (): Promise<Product[]> => {
    return ProductModel.find().exec();
}

export const findProductById = (id: string): Promise<Product> => {
    return ProductModel.findById(id).exec();
}

export const saveProduct = (product: Product): Promise<Product> => {
    return new ProductModel(product).save();
}

export const findAndUpdateProduct = (product: Product): Promise<Product> => {
    return ProductModel.findByIdAndUpdate(product._id, product, {new: true}).exec();    
}

export const removeProduct = (id: string): Promise<Product> => {
    return ProductModel.findByIdAndRemove(id).exec();
}

export const saveProducts = async (products: Product[]): Promise<Product[]> => {
    const session = await startSession();
    session.startTransaction();
    try {
        let savedProducts = await Promise.all(products.map((product) => 
            saveProduct(product)
        ));
        await session.commitTransaction();
        session.endSession();
        return savedProducts;
    }
    catch(error) {
        logger.error(`error while creatingProducts! aborting transaction!!!`);
        await session.abortTransaction();
        session.endSession();
        throw new Error(error);
    }
}