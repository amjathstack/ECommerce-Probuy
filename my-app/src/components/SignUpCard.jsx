"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import {
    closeSignUpCard,
    openLoginCard,
} from "@/features/components/componentsSlice";
import axios from "axios";
import { signIn } from "next-auth/react";

function SignUpCard() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [formClose, setFormClose] = useState(false);

    const dispatch = useDispatch();
    const { signUpCardStatus } = useSelector((state) => state.components);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);

            const response = await axios.post("/api/user", formData);

            if (response.data.status && response.data.message) {
                const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });

                if (result?.error) {
                    toast.error(result.error);
                    setLoading(false);
                    return;
                }
                setLoading(false);
                setFormClose(true);
                return
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
        if (signUpCardStatus) {
            document.body.classList.add("body-no-scroll");
        } else {
            document.body.classList.remove("body-no-scroll");
        }

        return () => document.body.classList.remove("body-no-scroll");
    }, [signUpCardStatus]);

    useEffect(() => {
        if (!loading && formClose) {
            dispatch(closeSignUpCard());
        }
    }, [loading, formClose])

    if (!signUpCardStatus) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-xl">

                <div className="mb-8 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
                        <p className="mt-1 text-xs text-gray-500">
                            Create your account to start learning or teaching
                        </p>
                    </div>

                    <button
                        onClick={() => dispatch(closeSignUpCard())}
                        className="text-gray-500 hover:text-gray-800"
                        aria-label="Close signup modal"
                    >
                        <X size={20} />
                    </button>
                </div>


                <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                    <div className="mt-4 relative">
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
                                       focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600
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
                                        peer-focus:text-indigo-600

                                        peer-not-placeholder-shown:-top-[1px]
                                        peer-not-placeholder-shown:text-xs
                                        peer-not-placeholder-shown:text-gray-600
                                    "
                        >
                            Full Name
                        </label>
                    </div>

                    <div className="relative mt-4">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="
                                       peer w-full rounded-full border border-gray-300 bg-transparent
                                       px-5 py-3 text-gray-900 outline-none transition
                                       placeholder-transparent
                                       focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600
                                     "
                        />
                        <label
                            htmlFor="email"
                            className="
                                        absolute left-5 top-1/2 -translate-y-1/2 bg-white px-2
                                        text-gray-400 text-sm transition-all
                        
                                        peer-placeholder-shown:top-1/2
                                        peer-placeholder-shown:text-sm
                        
                                        peer-focus:-top-[1px]
                                        peer-focus:text-xs
                                        peer-focus:text-indigo-600
                    
                                        peer-not-placeholder-shown:-top-[1px]
                                        peer-not-placeholder-shown:text-xs
                                        peer-not-placeholder-shown:text-gray-600
                                      "
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative mt-4">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="
                                       peer w-full rounded-full border border-gray-300 bg-transparent
                                       px-5 py-3 text-gray-900 outline-none transition
                                       placeholder-transparent
                                       focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600
                                     "
                        />
                        <label
                            htmlFor="password"
                            className="
                                       absolute left-5 top-1/2 -translate-y-1/2 bg-white px-2
                                       text-gray-400 text-sm transition-all
                       
                                       peer-placeholder-shown:top-1/2
                                       peer-placeholder-shown:text-sm
                       
                                       peer-focus:-top-[1px]
                                       peer-focus:text-xs
                                       peer-focus:text-indigo-600
                       
                                       peer-not-placeholder-shown:-top-[1px]
                                       peer-not-placeholder-shown:text-xs
                                       peer-not-placeholder-shown:text-gray-600
                                     "
                        >
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`
                                    relative mt-7 w-full rounded-full bg-indigo-600
                                    px-6 py-3 text-sm font-medium text-white transition
                                    hover:bg-indigo-600/90
                                    ${loading ? "cursor-not-allowed opacity-80" : ""}
                                  `}
                    >
                        {loading ? (
                            <p>Loading...</p>
                        ) : <p>Create Account</p>
                        }

                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <span
                        onClick={() => dispatch(openLoginCard())}
                        className="cursor-pointer font-medium text-indigo-600 hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignUpCard;

