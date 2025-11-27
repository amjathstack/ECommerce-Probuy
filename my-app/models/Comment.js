import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    productId:{type:String, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    rating:{type:Number, required:true},
    comment:{type:String, required:true},

})

const commentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default commentModel;