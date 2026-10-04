import mongoose from "mongoose";
import './User.js';

const reviewsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
})

const productsSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    reviews: [reviewsSchema],
    stockCount: { type: Number, required: true, default: 0 },
})

const productsModel = mongoose.models.Products || mongoose.model('Products', productsSchema);
export default productsModel;