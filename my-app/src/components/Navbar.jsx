'use client'
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import cart_icon from '../../public/icons/cart.svg'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { openLoginCard } from "@/features/components/componentsSlice";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import profile from "../../public/icons/profile.jpg";

export default function Navbar() {

    const { cartItems } = useSelector((state) => state.cart);
    const router = useRouter();
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const [openMenu, setOpenMenu] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);

    return (
        <header className="flex relative items-center sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm justify-center">
            <div className="w-full px-6 sm:px-6 lg:px-50 flex items-center justify-between h-16">

                <div onClick={() => router.push('/')} className="cursor-pointer">
                    <Image src="/logo.png" alt="logo" className="w-24 sm:w-28" width={1000} height={1000} />
                </div>

                <div className="hidden md:flex mx-6 gap-[20px] flex-1 justify-center">
                    <nav className="flex items-center gap-2 text-sm text-gray-600">
                        <a className="px-3 py-2 hover:text-gray-900" href="#">Home</a>
                        <a className="px-3 py-2 hover:text-gray-900" href="#categories">Categories</a>
                        <a className="px-3 py-2 hover:text-gray-900" href="#vendors">Vendors</a>
                        <a className="px-3 py-2 hover:text-gray-900" href="#deals">Deals</a>
                    </nav>

                    <div className="w-full max-w-[500px] border border-gray-200 rounded-[50px] flex items-center">
                        <input
                            className="w-full p-2 outline-none rounded-full bg-transparent px-4 text-[15px]"
                            placeholder="Search products, brands, vendors..."
                        />
                        <button className="px-6 py-2 rounded-[50px] text-sm bg-indigo-600 text-white shadow cursor-pointer">
                            Search
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">

                    <button
                        onClick={() => setMobileNav(!mobileNav)}
                        className="md:hidden text-xl"
                    >
                        ☰
                    </button>

                    {session?.user?.isSeller &&
                        <button
                            onClick={() => router.push('/vendor')}
                            className="hidden sm:flex py-1 px-4 bg-indigo-50 text-[13px] rounded-full cursor-pointer">
                            Dashboard
                        </button>
                    }

                    <button onClick={() => router.push('/cart')} className="cursor-pointer relative inline-flex items-center">
                        <Image className="w-[24px] sm:w-[28px]" src={cart_icon} alt="cart_icon" />
                        {cartItems?.length > 0 &&
                            <div className="absolute rounded-full flex items-center justify-center w-[10px] h-[10px] bg-red-500 top-[1px] right-[-1px]"></div>
                        }
                    </button>

                    {session
                        ? <div onClick={() => setOpenMenu(true)} className="rounded-full overflow-hidden">
                            {
                                session?.user?.profileImage
                                    ? <img src={session.user.profileImage} className="w-8 h-8 cursor-pointer" alt="profile" />
                                    : <Image src={profile} className="w-8 h-8 cursor-pointer" width={1000} height={1000} alt="profile" />
                            }
                        </div>
                        : <button
                            onClick={() => dispatch(openLoginCard())}
                            className="hidden sm:inline-flex border border-gray w-[100px] h-[36px] items-center justify-center rounded-md hover:bg-gray-100 cursor-pointer">
                            Sign in
                        </button>
                    }
                </div>
            </div>

            {mobileNav &&
                <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden p-4 space-y-3">
                    <a className="block text-gray-700" href="#">Home</a>
                    <a className="block text-gray-700" href="#categories">Categories</a>
                    <a className="block text-gray-700" href="#vendors">Vendors</a>
                    <a className="block text-gray-700" href="#deals">Deals</a>

                    <div className="w-full border border-gray-200 rounded-[50px] flex items-center mt-3">
                        <input
                            className="w-full p-2 outline-none rounded-full px-4 text-[15px]"
                            placeholder="Search..."
                        />
                        <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-full">
                            Search
                        </button>
                    </div>
                </div>
            }

            {
                openMenu &&
                <ProfileMenu
                    name={session?.user?.name}
                    profileMenuStatus={openMenu}
                    isSeller={session?.user?.isSeller}
                    onClose={setOpenMenu}
                />
            }
        </header>
    )
}