'use client'
import { openCreateStoreForm } from "@/features/components/componentsSlice";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";


export default function ProfileMenu({ name, profileMenuStatus, isSeller, onClose }) {

    const router = useRouter();
    const popupRef = useRef(null);
    const dispatch = useDispatch();

    const handleLogout = () => {
        try {
            signOut()
            onClose(false);
            router.push('/');
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
        <div ref={popupRef} className="absolute w-[200px] py-3 bg-white top-[50px] right-[65px] border border-gray-300 rounded-[7px]">
            <p className="text-[16px] px-3">Hi!, {name}</p>
            <ul className="style-none mt-2">
                <li onClick={() => {
                    router.push('/order');
                    onClose(false);
                }} className="w-full hover:bg-gray-100 px-3 py-1 text-[15px] text-gray-800 cursor-pointer">My Orders</li>
                {
                    !isSeller &&
                    <li onClick={() => {
                        dispatch(openCreateStoreForm())
                        onClose(false)
                    }} className="w-full hover:bg-gray-100 px-3 py-1 text-[15px] text-gray-800 cursor-pointer">Create Store</li>
                }

                <li onClick={() => handleLogout()} className="w-full hover:bg-gray-100 px-3 py-1 text-[15px] text-gray-800 cursor-pointer">Logout</li>
            </ul>
        </div>
    )
}