"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "@/features/cart/cartSlice";
import { fetchAddress } from "@/features/address/addressSlice";

import { fetchProducts } from "@/features/products/productSlice";
import { fetchOrders } from "@/features/order/orderSlice";

export default function PublicLayout({ children }) {

    const { loginCardStatus, signUpCardStatus, userProfileStatus } = useSelector((state) => state.components);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (user?._id) {
    //         dispatch(fetchCart())
    //     }
    // }, [user?._id])

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
            <Navbar />
            {children}
            <Footer />
        </>
    )
}