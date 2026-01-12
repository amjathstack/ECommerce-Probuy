import mongoose from "mongoose";

const storesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
})

const storesModel = mongoose.models.Stores || mongoose.model('Stores', storesSchema);
export default storesModel;