import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    logo:{type:String, required:true},
    name:{type:String, required:true},
    category:{type:String, required:true},
    description:{type:String, required:true},
    address:{type:String, required:true}

})

const storeModel = mongoose.models.Stores || mongoose.model('Stores', storeSchema);
export default storeModel;