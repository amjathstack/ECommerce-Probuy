'use client'
import { authUser } from "@/context/authContext";
import { closeProfileMenu, openUserProfile } from "@/features/components/componentsSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { clearToCart } from "@/features/cart/cartSlice";
import { clearOrder } from "@/features/order/orderSlice";


export default function ProfileMenu({ name, profileMenuStatus, onClose }) {

    const dispatch = useDispatch({  });
    const router = useRouter();
    const popupRef = useRef(null);
    const { logout } = authUser();

    const handleLogout = () => {
        try {
            logout()
            dispatch(closeProfileMenu());
            dispatch(clearToCart());
            dispatch(clearOrder());
            router.push('/public');
        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose(false);
            }
        }

        if (profileMenuStatus) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, [profileMenuStatus])


    if (!profileMenuStatus) return null;

    return (
        <div ref={popupRef} className="absolute w-[200px] py-3 bg-white top-[40px] right-[-10px] border border-gray-300 rounded-[7px]">
            <p className="text-[16px] px-3">Hi!, {name}</p>
            <ul className="style-none mt-2">
                <li onClick={() => router.push('/public/order')} className="w-full hover:bg-gray-100 px-3 py-1 text-[15px] text-gray-800 cursor-pointer">My Orders</li>
                <li onClick={() => dispatch(openUserProfile())} className="w-full hover:bg-gray-100 px-3 py-1 text-[15px] text-gray-800 cursor-pointer">Profile</li>
                <li onClick={() => handleLogout()} className="w-full hover:bg-gray-100 px-3 py-1 text-[15px] text-gray-800 cursor-pointer">Logout</li>
            </ul>
        </div>
    )
}