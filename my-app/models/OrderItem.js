import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    },
    subOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubOrders',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    title: String,
    price: Number,
    quantity: Number,
});

const orderItemsModel = mongoose.models.OrderItems || mongoose.model('OrderItems', orderItemSchema);
export default orderItemsModel;