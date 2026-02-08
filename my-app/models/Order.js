import mongoose from "mongoose";


const ordersSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Partially Shipped', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    address: { type: Object, required: true },
}, { timestamps: true });

const ordersModel = mongoose.models.Orders || mongoose.model('Orders', ordersSchema);
export default ordersModel;