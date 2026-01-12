"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "@/features/cart/cartSlice";
import { fetchAddress } from "@/features/address/addressSlice";

import { fetchProducts } from "@/features/products/productSlice";
import { fetchOrders } from "@/features/order/orderSlice";
import LoginCard from "@/components/LoginCard";
import SignUpCard from "@/components/SignUpCard";
import { useSession } from "next-auth/react";
import CreateStoreForm from "@/components/CreateStoreForm";

export default function PublicLayout({ children }) {

    const { loginCardStatus, signUpCardStatus, createStoreFormStatus } = useSelector((state) => state.components);
    const dispatch = useDispatch();
    const { data:session } = useSession();


    useEffect(() => {
        if (session) {
            dispatch(fetchCart())
        }
    }, [session])

    // useEffect(() => {
    //     dispatch(fetchAddress(token))
    // }, [dispatch, token])

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    // useEffect(() => {
    //     if (token) {
    //         dispatch(fetchOrders(token));
    //     }
    // }, [dispatch, token]);

    return (
        <>
            {loginCardStatus && <LoginCard />}
            {signUpCardStatus && <SignUpCard />}
            { createStoreFormStatus && <CreateStoreForm/> }
            <Navbar />
            {children}
            <Footer />
        </>
    )
}