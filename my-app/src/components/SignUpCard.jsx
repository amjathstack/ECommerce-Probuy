"use client";
import { authUser } from "@/context/authContext";
import { closeSignUpCard, openLoginCard } from "@/features/components/componentsSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignupCard() {

    const dispatch = useDispatch();
    const { signupUser } = authUser()

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === confirmPassword){
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            signupUser(formData);
        }
        dispatch(closeSignUpCard())
    }

    return (
        <div className="fixed bg-[#9c9c9c63] top-0 min-h-screen w-[100%] h-[100vh] flex items-center justify-center p-4 z-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
                <p className="text-sm text-center text-gray-500 mt-1">
                    Join MarketHub to start shopping and selling
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                    <div className="mt-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="John Doe"
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@example.com"
                        />
                    </div>


                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="••••••••"
                        />
                    </div>


                    <div className="mt-4">
                        <label
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 font-medium shadow-sm transition"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a onClick={() => dispatch(openLoginCard())} className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium">
                        Sign in
                    </a>
                </div>
            </div>
        </div>
    );
}
