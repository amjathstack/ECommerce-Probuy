"use client";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddAddressCard({ onClose, fetchAddresses }) {

    const [loading, setLoading] = useState(false);
    const [formClose, setFormClose] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        phoneNumber: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        province: "",
        postalCode: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append("name", form.fullName);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("strAddress1", form.streetAddress1);
        formData.append("strAddress2", form.streetAddress2);
        formData.append("city", form.city);
        formData.append("province", form.province);
        formData.append("postalCode", form.postalCode);

        const response = await axios.post('/api/user/address', formData);

        if (response.data.status && response.data.message) {
            console.log(response.data.message)
            toast.success("Address saved!");
            setLoading(false);
            setFormClose(true);
            fetchAddresses();
            return
        }

        setLoading(false);
        toast.error(response.data.message)

    };

    useEffect(() => {

        if (!loading && formClose) {
            onClose(false);
        }

    }, [loading, formClose]);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 w-[500px] md:w-auto">
                <div className="flex mb-8 items-center w-full justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Shipping Details
                    </h2>
                    <X onClick={() => onClose(false)} />
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
                        disabled={loading}
                        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Save Address {loading && "Loading..."}
                    </button>
                </form>
            </div>
        </div>
    );
}
