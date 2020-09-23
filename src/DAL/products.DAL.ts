import { ProductDocument } from "../models/product.model";
import { Product } from "../schemas/product.schema";
import { startSession } from "mongoose";
import { logger } from "../logger/logger";

export const findAllProducts = (): Promise<ProductDocument[]> => {
    return Product.find().exec();
}

export const findProductById = (id: string): Promise<ProductDocument> => {
    return Product.findById(id).exec();
}

export const saveProduct = (product: ProductDocument): Promise<ProductDocument> => {
    return new Product(product).save();
}

export const findAndUpdateProduct = (product: ProductDocument): Promise<ProductDocument> => {
    return Product.findByIdAndUpdate(product._id, product, {new: true}).exec();    
}

export const removeProduct = (id: string): Promise<ProductDocument> => {
    return Product.findByIdAndRemove(id).exec();
}

export const saveProducts = async (products: ProductDocument[]): Promise<ProductDocument[]> => {
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