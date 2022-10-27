/*Product model schema. Requirements: Each product has the following data: SKU, title and image. */
import mongoose, { Schema } from "mongoose";


interface Product{
    SKU: string;
    title: string;
    imageURL: string;
}

const productSchema = new Schema<Product>({
    SKU: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    imageURL: {type: String, required: true},
});


module.exports = mongoose.model<Product>("Product", productSchema);