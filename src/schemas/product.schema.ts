import { Schema, model } from 'mongoose';
import { ProductDocument } from '../models/product.model';

export const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    limit: {type: Number}
}, { versionKey: false });

export const Product = model<ProductDocument>('Product', ProductSchema);