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

    return (
        <header className="flex relative items-center sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm justify-center">
            <div className="w-[90%] flex items-center justify-between h-16">

                <div className="flex items-center gap-4">
                    <div onClick={() => router.push('/')} className="text-2xl cursor-pointer">Probuy</div>
                </div>

                <div className="hidden sm:flex mx-6 gap-[20px]">
                    <nav className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                        <a className="px-3 py-2 hover:text-gray-900" href="#">Home</a>
                        <a className="px-3 py-2 hover:text-gray-900" href="#categories">Categories</a>
                        <a className="px-3 py-2 hover:text-gray-900" href="#vendors">Vendors</a>
                        <a className="px-3 py-2 hover:text-gray-900" href="#deals">Deals</a>
                    </nav>
                    <div className="block w-[500px] border border-gray-200 rounded-[50px]">
                        <input
                            className="w-[80%] p-2 outline-none rounded-full bg-transperent px-4 py-2 text-[15px]"
                            placeholder="Search products, brands, vendors..."
                        />
                        <button className="ml-[7px] px-6 py-2 rounded-[50px] text-sm bg-indigo-600 text-white shadow cursor-pointer">Search</button>
                    </div>
                </div>

                <div className="flex items-center gap-6">

                    {session?.user?.isSeller &&
                        <button
                            onClick={() => router.push('/vendor')}
                            className="md:flex py-1 px-4 bg-gray-200 text-[13px] rounded-full cursor-pointer">
                            Dashboard
                        </button>
                    }

                    <button onClick={() => router.push('/cart')} className="cursor-pointer relative inline-flex items-center rounded-md text-white">
                        <Image className="w-[28px]" src={cart_icon} alt="cart_icon" />
                        {cartItems?.length > 0 &&
                            <div className="absolute rounded-full flex items-center justify-center w-[10px] h-[10px] bg-[red] top-[1px] right-[-1px]"></div>
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
                        : <button onClick={() => dispatch(openLoginCard())} className="border border-gray w-[120px] h-[40px]  sm:inline-flex items-center justify-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">Sign in</button>
                    }

                </div>
            </div>

            {
                openMenu &&
                <ProfileMenu name={session?.user?.name} profileMenuStatus={openMenu} isSeller={session?.user?.isSeller} onClose={setOpenMenu} />
            }

        </header>
    )
}
