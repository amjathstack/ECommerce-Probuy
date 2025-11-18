"use client";
import React, { useState } from "react";
import Image from "next/image";
import close_icon from '../../public/icons/close.svg'
import google_icon from '../../public/icons/google.svg'
import { useDispatch } from "react-redux";
import { closeLoginCard, closeProfileMenu, openSignUpCard } from "@/features/components/componentsSlice";
import { authUser } from "@/context/authContext";


export default function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { signInUser } = authUser()

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            signInUser(email, password);
            dispatch(closeLoginCard());
            dispatch(closeProfileMenu());
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="fixed bg-[#9c9c9c63] top-0 min-h-screen w-[100%] h-[100vh] flex items-center justify-center p-4 z-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 relative">

                <button onClick={() => dispatch(closeLoginCard())} className="cursor-pointer absolute top-6 right-6">
                    <Image src={close_icon} alt="close_icon" className="w-[18px]" />
                </button>

                <p className="text-[20px] text-center mt-1">Sign in to your account</p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="mt-[15px]">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm mt-[15px]">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" /> Remember me
                        </label>
                        <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        disabled={loading}
                        className="mt-[20px] w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 font-medium shadow-sm transition"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <div className="flex items-center mt-[20px]">
                        <div className="bg-gray-600 h-[1px] w-full" /><p className="px-2 text-[14px]">OR</p><div className="bg-gray-600 h-[1px] w-full" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-[15px] mt-[20px] text-[15px] w-full bg-white hover:bg-gray-100 rounded-lg py-2 transition border border-gray-500"
                    >
                        <Image src={google_icon} alt="google_icon" className="w-[18px]"/>  Sign in with Google
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a onClick={() => dispatch(openSignUpCard())} className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}
