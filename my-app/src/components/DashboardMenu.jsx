import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function DashboardMenu() {

    const path = usePathname()
    const router = useRouter();
    const [page, setPage] = useState('dashboard');

    const handleDashboard = () => {
        setPage('/admin')
        router.push('/admin')
    }

    const handleProducts = () => {
        setPage('/admin/products')
        router.push('/admin/products')
    }

    const handleOrders = () => {
        setPage('/admin/order')
        router.push('/admin/order')
    }

    const handleReviews = () => {
        router.push('/admin/Orders')
    }

    const handleSettings = () => {
        router.push('/public')
    }

    useEffect(() => {
        setPage(path)
    }, [path])

    return (
        <>
            <aside className="z-5 w-[15%] fixed flex h-full  bg-white shadow-lg hidden md:flex flex-col">
                <div className="px-6 py-6 border-b">
                    <h1 className="text-2xl font-bold text-indigo-600">ShopAdmin</h1>
                </div>

                <nav className="flex-1 space-y-3 text-gray-700 mt-[30px]">
                    <a
                        onClick={() => handleDashboard()}
                        className={
                            page === '/admin'
                                ? "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                                : "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                        }>
                        🏠 Dashboard
                    </a>
                    <a onClick={() => handleProducts()}
                        className={
                            page === '/admin/products'
                                ? "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                                : "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                        }>
                        📦 Products
                    </a>
                    <a onClick={() => handleOrders()}
                        className={
                            page === '/admin/order'
                                ? "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                                : "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                        }>
                        🛍️ Orders
                    </a>
                    <a onClick={() => handleSettings()} className={
                        page === 'settings'
                            ? "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer border-r-5 border-indigo-500"
                            : "block p-3 pl-10 hover:bg-indigo-50 cursor-pointer"
                    }>
                        ⚙️ Back to Site
                    </a>
                </nav>

                <div className="p-6 border-t text-sm text-gray-500">
                    &copy; 2025 ShopAdmin
                </div>
            </aside>
        </>
    )
}