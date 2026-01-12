'use client'
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { closeLoginCard, openSignUpCard } from "@/features/components/componentsSlice";

function LoginCard() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loginCardStatus } = useSelector((state) => state.components);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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

        toast.success("Logged in successfully!");
        dispatch(closeLoginCard());
        router.push("/");
        setLoading(false);
    };

    const handleGoogleLogin = () => {
        setGoogleLoading(true);
        signIn("google");
        setGoogleLoading(false);
    };

    useEffect(() => {
        document.body.classList.toggle("body-no-scroll", loginCardStatus);
        return () => document.body.classList.remove("body-no-scroll");
    }, []);

    if (!loginCardStatus) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="relative bg-white text-gray-500 w-full max-w-100 mx-4 p-6 rounded-xl shadow-lg">

                <button
                    onClick={() => dispatch(closeLoginCard())}
                    className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 cursor-pointer"
                    aria-label="Close login modal"
                >
                    <X size={20} />
                </button>


                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Welcome back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5 text-sm">

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
                                       focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60]
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
                                        peer-focus:text-[#27AE60]
                    
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
                                       focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60]
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
                                       peer-focus:text-[#27AE60]
                       
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
                                    relative mt-7 w-full rounded-full bg-[#27AE60]
                                    px-6 py-3 text-sm font-medium text-white transition
                                    hover:bg-[#27AE60]/90
                                    ${loading ? "cursor-not-allowed opacity-80" : ""}
                                  `}
                    >
                        {loading && (
                            <p>Loading...</p>
                        )}
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Create a new account{" "}
                    <span
                        onClick={() => dispatch(openSignUpCard())}
                        className="cursor-pointer font-medium text-[#00753b] hover:underline"
                    >
                        Sign up
                    </span>
                </p>

                <button
                    type="button"
                    disabled={googleLoading}
                    onClick={handleGoogleLogin}
                    className={`
                                    relative flex items-center mt-7 w-full rounded-full
                                    px-6 py-3 justify-center text-sm font-medium
                                    gap-3 transition border
                                    ${loading ? "cursor-not-allowed opacity-80" : ""}
                                  `}
                >
                    {googleLoading &&
                        <Spinner className="absolute left-5 w-10 h-6 bottom-[7px]" color="white" />
                    }
                    <img
                        className="h-4 w-4"
                        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
                        alt="Google"
                    />
                    Log in with Google
                </button>

            </div>
        </div>
    );
}

export default LoginCard;
