import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:Array, required:true},
    category:{type:String, required:true},
    stockCount:{type:Number, required:true, default:0},
})

const productsModel = mongoose.models.Products || mongoose.model('Products', productsSchema);
export default productsModel;