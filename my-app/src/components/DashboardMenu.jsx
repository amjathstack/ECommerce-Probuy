"use client"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import leave_icon from '../../public/icons/leave.svg';


export default function DashboardMenu() {

    const path = usePathname()
    const router = useRouter();
    const [page, setPage] = useState('dashboard');

    const handleDashboard = () => {
        setPage('/vendor')
        router.push('/vendor')
    }

    const handleProducts = () => {
        setPage('/vendor/products')
        router.push('/vendor/products')
    }

    const handleOrders = () => {
        setPage('/vendor/order')
        router.push('/vendor/order')
    }

    const handleReviews = () => {
        router.push('/vendor/Orders')
    }

    const handleSettings = () => {
        router.push('/')
    }

    useEffect(() => {
        setPage(path)
    }, [path])

    return (
        <>
            <aside className="z-5 w-[15%] fixed flex h-full  bg-white shadow-lg hidden md:flex flex-col">
                <div className="mt-2 border-b border-gray-200">
                    <h1 className="text-2xl py-5 pl-10 font-bold text-indigo-600">Probuy</h1>
                </div>

                <nav className="flex-1 space-y-3 text-gray-700 mt-[30px]">
                    <a
                        onClick={() => handleDashboard()}
                        className={
                            page === '/vendor'
                                ? "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                                : "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                        }>
                        Dashboard
                    </a>
                    <a onClick={() => handleProducts()}
                        className={
                            page === '/vendor/products'
                                ? "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                                : "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                        }>
                        Products
                    </a>
                    <a onClick={() => handleOrders()}
                        className={
                            page === '/vendor/order'
                                ? "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                                : "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                        }>
                        Orders
                    </a>
                    <a onClick={() => handleSettings()} className={
                        page === 'settings'
                            ? "flex gap-1 block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                            : "flex gap-1 block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                    }>
                        <Image width={18} src={leave_icon} alt='leave_icon' /> Back to Site
                    </a>
                </nav>

                <div className="p-6 border-t border-gray-200 text-sm text-gray-500">
                    &copy; 2026 Dashboard
                </div>
            </aside>
        </>
    )
}