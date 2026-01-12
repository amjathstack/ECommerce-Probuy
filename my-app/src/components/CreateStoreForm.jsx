"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import {
    closeCreateStoreForm,
} from "@/features/components/componentsSlice";
import axios from "axios";

function CreateStoreForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);

    const router = useRouter()
    const dispatch = useDispatch();
    const { createStoreFormStatus } = useSelector((state) => state.components);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !profileImg) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("image", profileImg)

            const response = await axios.post("/api/store", formData);

            if (response.data.message) {
                router
                return dispatch(closeCreateStoreForm());
            }

            return toast.error(response.data.message)

        } catch (error) {
            console.log(error.message)
            toast.error("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (profileImg) {
            setPreview(URL.createObjectURL(profileImg));
        }
    }, [profileImg])

    useEffect(() => {
        if (createStoreFormStatus) {
            document.body.classList.add("body-no-scroll");
        } else {
            document.body.classList.remove("body-no-scroll");
        }

        return () => document.body.classList.remove("body-no-scroll");
    }, [createStoreFormStatus]);

    if (!createStoreFormStatus) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-[500px] rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-4 flex items-start justify-between">
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-gray-800">Create your store</h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Create your store to sell the products what you want
                        </p>
                    </div>

                    <button
                        onClick={() => dispatch(closeCreateStoreForm())}
                        className="text-gray-500 hover:text-gray-800"
                        aria-label="Close signup modal"
                    >
                        <X size={20} />
                    </button>
                </div>


                <form onSubmit={handleSubmit} className="space-y-5 text-sm">

                    <div className="w-full flex items-center justify-center">
                        <input
                            type="file"
                            className="hidden"
                            ref={fileRef}
                            accept="image/*"
                            onChange={(e) => setProfileImg(e.target.files[0])}
                        />

                        <img
                            src={
                                preview ||
                                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                            }
                            alt="Profile Avatar"
                            className="w-30 h-30 rounded-full border border-gray-200 my-2 cursor-pointer"
                            onClick={() => fileRef.current.click()}
                        />
                    </div>

                    <div className="mt-2 relative">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            required
                            className="
                                       peer w-full rounded-full border border-gray-300 bg-transparent
                                       px-5 py-3 text-gray-900 outline-none transition
                                       placeholder-transparent
                                       focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60]
                                     "
                        />
                        <label
                            htmlFor="name"
                            className="
                                        absolute left-5 top-1/2 -translate-y-1/2 bg-white px-2
                                        text-gray-400 text-sm transition-all
                        
                                        peer-placeholder-shown:top-1/2
                                        peer-placeholder-shown:text-sm
                        
                                        peer-focus:-top-[1px]
                                        peer-focus:text-xs
                                        peer-focus:text-[#27AE60]

                                        peer-not-placeholder-shown:-top-[1px]
                                        peer-not-placeholder-shown:text-xs
                                        peer-not-placeholder-shown:text-gray-600
                                    "
                        >
                            Store Name
                        </label>
                    </div>

                    <div className="relative mt-7">
                        <textarea
                            id="desscription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                            className="
                                       peer w-full rounded-[10px] border border-gray-300 bg-transparent
                                       px-5 py-3 text-gray-900 outline-none transition
                                       placeholder-transparent
                                       focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60]
                                       h-30
                                       max-h-40
                                       min-h-15
                                     "
                        />
                        <label
                            htmlFor="description"
                            className="
                                        absolute left-5 top-1/2 -translate-y-1/2 bg-white px-2
                                        text-gray-400 text-sm transition-all
                        
                                        peer-placeholder-shown:top-[1px]
                                        peer-placeholder-shown:text-sm
                        
                                        peer-focus:-top-[1px]
                                        peer-focus:text-xs
                                        peer-focus:text-[#27AE60]
                    
                                        peer-not-placeholder-shown:-top-[1px]
                                        peer-not-placeholder-shown:text-xs
                                        peer-not-placeholder-shown:text-gray-600
                                      "
                        >
                            Description
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                                    relative mt-7 w-full rounded-full bg-[#27AE60]
                                    px-6 py-3 text-sm font-medium text-white transition
                                    hover:bg-[#27AE60]/90
                                    ${loading ? "cursor-not-allowed opacity-80" : ""}
                                  `}
                    >
                        {loading && (
                            <p>Loading...</p>
                        )}
                        Create store
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateStoreForm;

