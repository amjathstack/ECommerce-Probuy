'use client'
import React, { useState } from "react"
import { openLoginCard } from "@/features/components/componentsSlice"
import { useDispatch, useSelector } from "react-redux"
import { authUser } from "@/context/authContext"
import user_icon from '../../public/icons/user.svg'
import cart_icon from '../../public/icons/cart.svg'
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";


export default function Navbar() {

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { user } = authUser();
    const router = useRouter();

    return (
        <header className="flex items-center sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm justify-center">
            <div className="w-[90%] flex items-center justify-between h-16">

                <div className="flex items-center gap-4">
                    <div onClick={() => router.push('/public')} className="text-3xl font-extrabold tracking-tight cursor-pointer">Probuy</div>
                </div>

                <div className="flex mx-6 gap-[20px]">
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

                    {user?.isSeller &&
                        <button
                            onClick={() => router.push('/admin')}
                            className="py-1 px-4 bg-gray-200 text-[13px] rounded-full cursor-pointer">
                            Dashboard
                        </button>
                    }

                    <button onClick={() => router.push('/public/cart')} className="cursor-pointer relative inline-flex items-center rounded-md text-white">
                        <Image className="w-[28px]" src={cart_icon} alt="cart_icon" />
                        {cartItems?.length > 0 &&
                            <div className="absolute rounded-full flex items-center justify-center w-[10px] h-[10px] bg-[red] top-[1px] right-[-1px]"></div>
                        }
                    </button>

                    {user
                        ? <div onClick={() => setShowProfileMenu(Prev => !Prev)} className="relative cursor-pointer flex items-center justify-center rounded-full border border-gray-400 w-[35px] h-[35px]">
                            <Image src={user_icon} alt='user_icon' className='w-[18px]' />
                            {showProfileMenu && <ProfileMenu name={user.name} profileMenuStatus={showProfileMenu} onClose={setShowProfileMenu} />}
                          </div>
                        : <button onClick={() => dispatch(openLoginCard())} className="border border-gray w-[120px] h-[40px] hidden sm:inline-flex items-center justify-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">Sign in</button>
                    }

                </div>
            </div>
        </header>
    )
}
