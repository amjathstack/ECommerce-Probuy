"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import SignupCard from "@/components/SignUpCard";
import LoginCard from "@/components/LoginCard";
import { useEffect } from "react";
import { fetchCart } from "@/features/cart/cartSlice";
import { authUser } from "@/context/authContext";

export default function PublicLayout({ children }) {

    const { loginCardStatus, signUpCardStatus } = useSelector((state) => state.components);
    const dispatch = useDispatch();
    const { user } = authUser();

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchCart())
        }
    }, [user?._id])

    return (
        <>
            
            {signUpCardStatus && <SignupCard />}
            {loginCardStatus && <LoginCard />}
            <Navbar />
            {children}
            <Footer />
        </>
    )
}