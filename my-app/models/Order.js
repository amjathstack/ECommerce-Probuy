import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    userId:{ type:String, required:true },
    orderId:{type:String, required:true},
    items:{type:Array, required:true},
    subTotal:{type:Number, required:true},
    tax:{type:Number, required:true},
    total:{type:Number, required:true},
    status:{type:String, enum:['pending', 'Processing', 'Delivered'], default:'pending'},
    paymentStatus:{type:String, required:true},
    paymentMethod:{type:String, required:true},
    address:{type:Object, required:true},
}, { timestamps:true } )

const ordersModel = mongoose.models.Orders || mongoose.model('Orders', ordersSchema);
export default ordersModel;