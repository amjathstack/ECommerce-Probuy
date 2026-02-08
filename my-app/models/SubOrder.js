import mongoose from "mongoose";

const subOrderSchema = new mongoose.Schema({

    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subTotal: Number,
    status: {
        type: String,
        enum: ['Pending',  'Processing', 'Delivered'],
        default: 'Pending'
    }
});

const subOrdersModel = mongoose.models.SubOrders || mongoose.model('SubOrders', subOrderSchema);
export default subOrdersModel;