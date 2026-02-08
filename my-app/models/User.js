import mongoose from "mongoose";

const addressesSchema = new mongoose.Schema({

    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    strAddress1: { type: String, required: true },
    strAddress2: { type: String },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },

})

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Array, default: [] },
    isSeller: { type: Boolean, default: false },
    addresses: [addressesSchema],
    title: { type: String },
    description: { type: String },
    profileImage: { type: String, default: '' },
    earnings: { type: Number }

})

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;