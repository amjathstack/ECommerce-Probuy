"use client";
import { addAddress, addToAddress } from "@/features/address/addressSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "@/context/authContext";

export default function AddAddressCard({ onClose }) {

    const [form, setForm] = useState({
        fullName: "",
        phoneNumber: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        province: "",
        postalCode: "",
    });
    const { user } = authUser()
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        const dataToSend = { ...form, userId: user?._id }
        e.preventDefault();
        dispatch(addAddress(form));
        dispatch(addToAddress(dataToSend));
        onClose(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 w-[90%] md:w-auto">
                <div className="flex items-center w-full justify-center">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Shipping Details
                    </h2>
                    <button onClick={() => onClose(false)}>X</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            type="tel"
                            required
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="+1 234 567 890"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Street Address 1</label>
                        <input
                            type="text"
                            name="streetAddress1"
                            required
                            value={form.streetAddress1}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="House No, Road"
                        />
                    </div>


                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Street Address 2</label>
                        <input
                            type="text"
                            name="streetAddress2"
                            value={form.streetAddress2}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Apartment, Floor (optional)"
                        />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <input
                                type="text"
                                required
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="City name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Province</label>
                            <input
                                type="text"
                                name="province"
                                required
                                value={form.province}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="State / Province"
                            />
                        </div>
                    </div>


                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-1">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={form.postalCode}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="123456"
                        />
                    </div>


                    <button
                        type="submit"
                        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Save Address
                    </button>
                </form>
            </div>
        </div>
    );
}
