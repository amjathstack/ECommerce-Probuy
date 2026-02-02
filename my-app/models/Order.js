import mongoose from "mongoose";

const subOrderSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number
        }
    ],

    subTotal: Number,

    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
});


const ordersSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subOrders: [subOrderSchema],
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Partially Shipped', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    address: { type: Object, required: true },
}, { timestamps: true });

const ordersModel = mongoose.models.Orders || mongoose.model('Orders', ordersSchema);
export default ordersModel;