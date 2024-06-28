// models/product.js
import mongoose, {model} from 'mongoose';


interface IProduct {
    _id?: string;
    name: string;
    price: number;
    category: string;
    title: string;
    stockBySize: Record<string, number>;
    description: string;
    material: string;
    images: string[];
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    stockBySize: {
        type: Map,
        of: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    material: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        required: true
    }
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
