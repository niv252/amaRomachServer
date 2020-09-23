import {Document} from 'mongoose';

export interface ProductDocument extends Document {
    name: string,
    description: string,
    price: number,
    image: string,
    limit?: number
}