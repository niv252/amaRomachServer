import {Document, Schema, model} from 'mongoose';

export interface IProduct extends Document {
    name: string,
    description: string,
    price: number,
    image: string,
    limit?: number
}

export const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    limit: {type: Number}
}, { versionKey: false });

const Product = model<IProduct>('Product', ProductSchema);

export default Product;